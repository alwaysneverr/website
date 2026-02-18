/**
 * config.js
 * Centralized configuration for star wipe animation
 * 
 * @module config
 * @author Claude-AlwaysNever
 * @version 1.0.0
 */

/**
 * Color palette (Persona 5 inspired)
 */
export const COLORS = {
    RED: '#e60012',
    BLACK: '#000000',
    WHITE: '#ffffff',
    CYAN: '#00FFFF'
};

/**
 * Responsive breakpoints (in pixels)
 */
export const BREAKPOINTS = {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024
};

/**
 * Animation timing configuration
 */
export const ANIMATION = {
    DURATION: 2500,              // Default animation duration (ms)
    FADE_DURATION: 300,          // Splash content fade duration (ms)
    REDUCED_MOTION_DURATION: 100 // Duration when reduced motion enabled (ms)
};

/**
 * Star animation configuration
 */
export const STAR = {
    POINTS: 4,                   // Number of star points (Persona 5 uses 4)
    INNER_RADIUS_RATIO: 0.35,    // Ratio of inner to outer radius
    MAX_DELAY: 0.3,              // Maximum delay for staggered animation
    DESKTOP_COUNT: 25,           // Number of stars on desktop
    MOBILE_COUNT: 15,            // Number of stars on mobile
    SIZE_VARIATION_MIN: 0.6,     // Minimum size multiplier
    SIZE_VARIATION_MAX: 1.4      // Maximum size multiplier
};

/**
 * Accessibility configuration
 */
export const A11Y = {
    FOCUS_OUTLINE_WIDTH: '3px',
    FOCUS_OUTLINE_OFFSET: '4px',
    MIN_TOUCH_TARGET: 44,        // Minimum touch target size (px)
    ANNOUNCEMENT_CLEAR_DELAY: 1000 // Screen reader announcement clear delay (ms)
};

/**
 * Combined configuration object
 */
export const CONFIG = {
    COLORS,
    BREAKPOINTS,
    ANIMATION_DURATION: ANIMATION.DURATION,
    FADE_DURATION: ANIMATION.FADE_DURATION,
    REDUCED_MOTION_DURATION: ANIMATION.REDUCED_MOTION_DURATION,
    STAR_POINTS: STAR.POINTS,
    STAR_INNER_RADIUS_RATIO: STAR.INNER_RADIUS_RATIO,
    STAR_MAX_DELAY: STAR.MAX_DELAY,
    STAR_DESKTOP_COUNT: STAR.DESKTOP_COUNT,
    STAR_MOBILE_COUNT: STAR.MOBILE_COUNT,
    A11Y_FOCUS_OUTLINE: A11Y.FOCUS_OUTLINE_WIDTH,
    A11Y_FOCUS_OFFSET: A11Y.FOCUS_OUTLINE_OFFSET,
    A11Y_MIN_TOUCH: A11Y.MIN_TOUCH_TARGET,
    A11Y_CLEAR_DELAY: A11Y.ANNOUNCEMENT_CLEAR_DELAY
};

/**
 * Default options for PersonaStarWipe
 */
export const DEFAULT_OPTIONS = {
    color: COLORS.BLACK,
    duration: ANIMATION.DURATION,
    starCount: null // Auto-calculate based on screen size
};

/**
 * Keyboard shortcuts configuration
 */
export const KEYBOARD = {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape'
};

/**
 * ARIA labels and announcements
 */
export const ARIA_LABELS = {
    ENTER_BUTTON: 'Begin star wipe transition to enter the main site',
    SKIP_BUTTON: 'Skip animation and enter site immediately',
    SPLASH_HEADING: 'Welcome',
    IMAGES_CONTAINER: 'Random welcome images',
    LOAD_ANNOUNCEMENT: 'Welcome splash screen loaded. Press Enter to begin or Escape to skip animation.',
    START_ANNOUNCEMENT: 'Starting transition to main content',
    SKIP_ANNOUNCEMENT: 'Skipping animation',
    SKIP_ESC_ANNOUNCEMENT: 'Skipping animation with Escape key',
    COMPLETE_ANNOUNCEMENT: 'Welcome! You have entered the main site.'
};

export default CONFIG;