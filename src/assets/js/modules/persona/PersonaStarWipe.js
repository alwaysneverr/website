/**
 * PersonaStarWipe.js
 * Main star wipe animation controller
 * 
 * @module PersonaStarWipe
 * @author Your Name
 * @version 1.0.0
 */

import { Star } from './Star.js';
import { CONFIG } from './config.js';

/**
 * Controls the star wipe transition animation
 * Creates and manages multiple stars with staggered timing
 * @class
 */
export class PersonaStarWipe {
    /**
     * Creates a new PersonaStarWipe instance
     * @param {HTMLCanvasElement} canvas - Canvas element for rendering
     * @param {Object} options - Configuration options
     * @param {string} options.color - Overlay color (default: Persona 5 red)
     * @param {number} options.starCount - Number of stars (auto-calculated if not provided)
     * @param {number} options.duration - Animation duration in ms
     */
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.progress = 0;
        this.isAnimating = false;
        this.animationId = null;
        
        // Configuration
        this.config = {
            color: options.color || CONFIG.COLORS.BLACK,
            starCount: options.starCount || null, // Auto-calculate if null
            duration: options.duration || CONFIG.ANIMATION_DURATION
        };
        
        this.resizeCanvas();
        this.setupEventListeners();
    }
    
    /**
     * Sets up window event listeners for resize and orientation change
     * @private
     */
    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.resizeCanvas(), 100);
        });
    }
    
    /**
     * Resizes the canvas to match window dimensions
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Draws the initial solid overlay
     * Called before animation starts to prevent flashing
     */
    drawInitialOverlay() {
        this.ctx.fillStyle = this.config.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Generates random stars across the screen
     * @private
     */
    generateStars() {
        this.stars = [];
        
        // Adjust number of stars based on screen size for performance
        const isMobile = window.innerWidth < CONFIG.BREAKPOINTS.MOBILE;
        const numStars = this.config.starCount || (isMobile ? 15 : 25);
        
        const maxRadius = Math.sqrt(
            Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)
        ) / 2;
        
        for (let i = 0; i < numStars; i++) {
            // Random position across the screen
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            
            // Varied sizes for depth
            const sizeVariation = 0.6 + Math.random() * 0.8;
            const radius = maxRadius * sizeVariation;
            
            // Staggered delays for cascade effect
            const delay = Math.random() * CONFIG.STAR_MAX_DELAY;
            
            // Random rotation
            const rotation = Math.random() * Math.PI * 2;
            
            this.stars.push(new Star(x, y, radius, delay, rotation));
        }
        
        // Sort by delay so earlier stars are drawn first
        this.stars.sort((a, b) => a.delay - b.delay);
    }
    
    /**
     * Renders all stars to the canvas
     * @private
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Fill the entire canvas with the overlay color
        this.ctx.fillStyle = this.config.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw all stars (cuts out star shapes)
        this.ctx.globalCompositeOperation = 'destination-out';
        
        for (const star of this.stars) {
            star.update(this.progress);
            star.draw(this.ctx);
        }
        
        this.ctx.globalCompositeOperation = 'source-over';
    }
    
    /**
     * Starts the star wipe animation
     * @param {number} duration - Animation duration in milliseconds
     * @param {Function} callback - Function to call when animation completes
     * @returns {Promise} Resolves when animation completes
     */
    animate(duration = this.config.duration, callback = null) {
        if (this.isAnimating) {
            return Promise.reject(new Error('Animation already in progress'));
        }
        
        return new Promise((resolve) => {
            this.isAnimating = true;
            this.progress = 0;
            this.generateStars();
            
            const startTime = performance.now();
            
            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                this.progress = Math.min(elapsed / duration, 1);
                
                this.draw();
                
                if (this.progress < 1) {
                    this.animationId = requestAnimationFrame(step);
                } else {
                    this.isAnimating = false;
                    if (callback) callback();
                    resolve();
                }
            };
            
            this.animationId = requestAnimationFrame(step);
        });
    }
    
    /**
     * Cancels the current animation
     */
    cancel() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isAnimating = false;
    }
    
    /**
     * Resets the animation state and clears the canvas
     */
    reset() {
        this.cancel();
        this.progress = 0;
        this.stars = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Cleans up resources and event listeners
     */
    destroy() {
        this.reset();
        window.removeEventListener('resize', () => this.resizeCanvas());
        window.removeEventListener('orientationchange', () => this.resizeCanvas());
    }
    
    /**
     * Gets the current animation progress
     * @returns {number} Progress value between 0 and 1
     */
    getProgress() {
        return this.progress;
    }
    
    /**
     * Checks if animation is currently running
     * @returns {boolean} True if animating
     */
    isRunning() {
        return this.isAnimating;
    }
}

export default PersonaStarWipe;