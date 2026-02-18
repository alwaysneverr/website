/**
 * main.js
 * Application entry point - initializes and wires together all modules
 * 
 * @module main
 * @author Claude-AlwaysNever
 * @version 1.0.0
 */

import { PersonaStarWipe } from './PersonaStarWipe.js';
import { 
    announceToScreenReader, 
    checkReducedMotion, 
    setFocus,
    setupSkipButton,
    setupKeyboardShortcuts,
    createAriaLiveRegion
} from './accessibility.js';
import { CONFIG, ARIA_LABELS, KEYBOARD } from './config.js';
import { ImageHover, initImageHover } from './hover.js';

/**
 * Main application class
 */
class StarWipeApp {
    constructor() {
        this.elements = {};
        this.starWipe = null;
        this.prefersReducedMotion = false;
        this.cleanupFunctions = [];
    }

    /**
     * Initialize the application
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Set up all components
     */
    setup() {
        this.cacheElements();
        this.checkPreferences();
        this.initializeStarWipe();
        this.setupEventHandlers();
        this.setupAccessibility();
        this.announceReady();
    }

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            splash: document.getElementById('splash'),
            enterBtn: document.getElementById('enterBtn'),
            skipBtn: document.getElementById('skipBtn'),
            canvas: document.getElementById('starCanvas'),
            mainContent: document.getElementById('main-content')
        };

        // Validate required elements
        const required = ['splash', 'enterBtn', 'canvas', 'mainContent'];
        for (const key of required) {
            if (!this.elements[key]) {
                console.error(`Required element not found: ${key}`);
            }
        }
    }

    /**
     * Check user preferences
     */
    checkPreferences() {
        this.prefersReducedMotion = checkReducedMotion();
        
        if (this.prefersReducedMotion) {
            console.log('Reduced motion enabled');
        }
    }

    /**
     * Initialize the star wipe animation
     */
    initializeStarWipe() {
        if (!this.elements.canvas) return;

        this.starWipe = new PersonaStarWipe(this.elements.canvas, {
            color: CONFIG.COLORS.BLACK,
            duration: CONFIG.ANIMATION_DURATION
        });
    }

    /**
     * Set up event handlers
     */
    setupEventHandlers() {
        // Enter button click
        if (this.elements.enterBtn) {
            this.elements.enterBtn.addEventListener('click', () => {
                this.startTransition(false);
            });
        }

        // Skip button click
        if (this.elements.skipBtn) {
            setupSkipButton(this.elements.skipBtn, () => {
                this.startTransition(true);
            });
        }

        // Keyboard shortcuts
        const cleanup = setupKeyboardShortcuts({
            [KEYBOARD.ENTER]: (e) => this.handleEnterKey(e),
            [KEYBOARD.SPACE]: (e) => this.handleSpaceKey(e),
            [KEYBOARD.ESCAPE]: (e) => this.handleEscapeKey(e)
        });
        this.cleanupFunctions.push(cleanup);
    }

    /**
     * Set up accessibility features
     */
    setupAccessibility() {
        // Create aria-live region if it doesn't exist
        createAriaLiveRegion('a11y-status', 'polite');

        // Set initial focus to enter button
        if (this.elements.enterBtn) {
            setFocus(this.elements.enterBtn, false);
        }
    }

    /**
     * Announce that the page is ready
     */
    announceReady() {
        announceToScreenReader(ARIA_LABELS.LOAD_ANNOUNCEMENT);
    }

    /**
     * Handle Enter key press
     */
    handleEnterKey(e) {
        if (this.isSplashVisible() && 
            document.activeElement === this.elements.enterBtn) {
            e.preventDefault();
            this.startTransition(false);
        }
    }

    /**
     * Handle Space key press
     */
    handleSpaceKey(e) {
        if (this.isSplashVisible() && 
            (document.activeElement === this.elements.enterBtn ||
             document.activeElement === this.elements.skipBtn)) {
            e.preventDefault();
            const shouldSkip = document.activeElement === this.elements.skipBtn;
            this.startTransition(shouldSkip);
        }
    }

    /**
     * Handle Escape key press
     */
    handleEscapeKey(e) {
        if (this.isSplashVisible()) {
            e.preventDefault();
            announceToScreenReader(ARIA_LABELS.SKIP_ESC_ANNOUNCEMENT);
            this.startTransition(true);
        }
    }

    /**
     * Check if splash screen is visible
     */
    isSplashVisible() {
        return this.elements.splash && 
               !this.elements.splash.classList.contains('hidden');
    }

    /**
     * Start the transition
     * @param {boolean} skipAnimation - Whether to skip the animation
     */
    async startTransition(skipAnimation = false) {
        announceToScreenReader(ARIA_LABELS.START_ANNOUNCEMENT);

        // If reduced motion or skip requested, complete immediately
        if (this.prefersReducedMotion || skipAnimation) {
            this.quickTransition();
            return;
        }

        // Full animated transition
        await this.animatedTransition();
    }

    /**
     * Quick transition without animation
     */
    quickTransition() {
        this.elements.splash.classList.add('transitioning');
        
        setTimeout(() => {
            this.completeTransition();
        }, CONFIG.REDUCED_MOTION_DURATION);
    }

    /**
     * Full animated transition
     */
    async animatedTransition() {
        // Draw red overlay immediately to cover main content
        this.starWipe.drawInitialOverlay();

        // Make splash transparent and fade out content
        this.elements.splash.classList.add('transitioning');

        // Wait for fade to complete
        await this.wait(CONFIG.FADE_DURATION);

        // Start star wipe animation
        try {
            await this.starWipe.animate(CONFIG.ANIMATION_DURATION);
            this.completeTransition();
        } catch (error) {
            console.error('Animation error:', error);
            this.completeTransition();
        }
    }

    /**
     * Complete the transition
     */
    completeTransition() {
        // Hide splash screen
        this.elements.splash.classList.add('hidden');
        
        // Enable scrolling
        document.body.style.overflow = 'auto';
        
        // Reset star wipe
        if (this.starWipe) {
            this.starWipe.reset();
        }

        // Move focus to main content
        this.moveFocusToMain();

        // Announce completion
        announceToScreenReader(ARIA_LABELS.COMPLETE_ANNOUNCEMENT);
    }

    /**
     * Move focus to main content heading
     */
    moveFocusToMain() {
        const mainHeading = this.elements.mainContent?.querySelector('h1');
        if (mainHeading) {
            setFocus(mainHeading, true);
        }
    }

    /**
     * Wait for specified duration
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise}
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Clean up resources
     */
    destroy() {
        // Run all cleanup functions
        this.cleanupFunctions.forEach(cleanup => cleanup());
        
        // Destroy star wipe
        if (this.starWipe) {
            this.starWipe.destroy();
        }
        
        console.log('App cleaned up');
    }
}

// Initialize the app
const app = new StarWipeApp();
app.init();

// Expose app instance globally (optional, for debugging)
if (typeof window !== 'undefined') {
    window.starWipeApp = app;
}

export default app;

// Simple usage
initImageHover('figure img.hover-change');

// Or with options
initImageHover('figure img.hover-change', {
    hoverSrcAttr: 'data-hover-src',
    preload: true,
    resetOnTapOutside: true
});

// Or using the class directly
const imageHover = new ImageHover('.gallery img.hover-effect', {
    preload: true
});