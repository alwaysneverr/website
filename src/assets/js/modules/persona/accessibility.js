/**
 * accessibility.js
 * Accessibility utilities and helpers
 * 
 * @module accessibility
 * @author Claude-AlwaysNever
 * @version 1.0.0
 */

import { CONFIG, ARIA_LABELS } from './config.js';

/**
 * Announces a message to screen readers via aria-live region
 * @param {string} message - Message to announce
 * @param {string} elementId - ID of the aria-live element (default: 'a11y-status')
 */
export function announceToScreenReader(message, elementId = 'a11y-status') {
    const status = document.getElementById(elementId);
    if (!status) {
        console.warn(`Aria-live element with id "${elementId}" not found`);
        return;
    }
    
    status.textContent = message;
    
    // Clear after announcement to allow repeated announcements
    setTimeout(() => {
        status.textContent = '';
    }, CONFIG.A11Y_CLEAR_DELAY);
}

/**
 * Checks if user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export function checkReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Checks if user prefers high contrast
 * @returns {boolean} True if high contrast is preferred
 */
export function checkHighContrast() {
    return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Sets focus to an element and makes it programmatically focusable
 * @param {HTMLElement} element - Element to focus
 * @param {boolean} removeFocusAfter - Remove tabindex after blur (default: true)
 */
export function setFocus(element, removeFocusAfter = true) {
    if (!element) {
        console.warn('Cannot set focus: element is null or undefined');
        return;
    }
    
    // Make element focusable if it's not naturally focusable
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
        
        if (removeFocusAfter) {
            // Remove tabindex after blur to return to natural tab order
            element.addEventListener('blur', function removeFocusHandler() {
                element.removeAttribute('tabindex');
                element.removeEventListener('blur', removeFocusHandler);
            }, { once: true });
        }
    }
    
    element.focus();
}

/**
 * Manages focus trap within a container (for modals/dialogs)
 * @param {HTMLElement} container - Container element to trap focus within
 * @returns {Function} Cleanup function to remove trap
 */
export function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
    
    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleTabKey);
    };
}

/**
 * Gets all ARIA announcement messages
 * @returns {Object} Object containing all ARIA label strings
 */
export function getAriaLabels() {
    return { ...ARIA_LABELS };
}

/**
 * Checks if screen reader is likely active
 * Note: This is a heuristic and not 100% reliable
 * @returns {boolean} True if screen reader is likely active
 */
export function isScreenReaderActive() {
    // Check for common screen reader indicators
    return (
        // Check if aria-live regions exist
        document.querySelector('[aria-live]') !== null ||
        // Check if user is navigating with keyboard
        document.activeElement !== document.body
    );
}

/**
 * Creates an aria-live region if it doesn't exist
 * @param {string} id - ID for the aria-live element
 * @param {string} priority - 'polite' or 'assertive' (default: 'polite')
 * @returns {HTMLElement} The aria-live element
 */
export function createAriaLiveRegion(id = 'a11y-status', priority = 'polite') {
    let element = document.getElementById(id);
    
    if (!element) {
        element = document.createElement('div');
        element.id = id;
        element.setAttribute('role', 'status');
        element.setAttribute('aria-live', priority);
        element.setAttribute('aria-atomic', 'true');
        element.className = 'sr-only';
        document.body.appendChild(element);
    }
    
    return element;
}

/**
 * Adds skip link functionality
 * @param {HTMLElement} skipButton - Skip button element
 * @param {Function} skipAction - Function to call when skip is activated
 */
export function setupSkipButton(skipButton, skipAction) {
    if (!skipButton) {
        console.warn('Skip button element not found');
        return;
    }
    
    skipButton.addEventListener('click', () => {
        announceToScreenReader(ARIA_LABELS.SKIP_ANNOUNCEMENT);
        skipAction();
    });
}

/**
 * Sets up keyboard shortcuts
 * @param {Object} handlers - Object mapping keys to handler functions
 * @returns {Function} Cleanup function to remove listeners
 */
export function setupKeyboardShortcuts(handlers) {
    function handleKeydown(e) {
        const handler = handlers[e.key];
        if (handler) {
            handler(e);
        }
    }
    
    document.addEventListener('keydown', handleKeydown);
    
    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleKeydown);
    };
}

/**
 * Checks if touch device
 * @returns {boolean} True if device supports touch
 */
export function isTouchDevice() {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

/**
 * Gets user's color scheme preference
 * @returns {string} 'light', 'dark', or 'no-preference'
 */
export function getColorSchemePreference() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'no-preference';
}

/**
 * Accessibility utilities object (alternative export style)
 */
export const a11y = {
    announce: announceToScreenReader,
    checkReducedMotion,
    checkHighContrast,
    setFocus,
    trapFocus,
    getAriaLabels,
    isScreenReaderActive,
    createAriaLiveRegion,
    setupSkipButton,
    setupKeyboardShortcuts,
    isTouchDevice,
    getColorSchemePreference
};

export default a11y;