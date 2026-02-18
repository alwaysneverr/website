/**
 * Star.js
 * Individual star entity for the star wipe animation
 * 
 * @module Star
 * @author Claude-AlwaysNever
 * @version 1.0.0
 */

/**
 * Represents a single 4-pointed star in the wipe animation
 * @class
 */
export class Star {
    /**
     * Creates a new Star instance
     * @param {number} x - X coordinate of star center
     * @param {number} y - Y coordinate of star center
     * @param {number} maxRadius - Maximum radius when fully expanded
     * @param {number} delay - Animation delay (0-1 normalized)
     * @param {number} rotation - Rotation angle in radians
     */
    constructor(x, y, maxRadius, delay, rotation) {
        this.x = x;
        this.y = y;
        this.maxRadius = maxRadius;
        this.delay = delay;
        this.rotation = rotation;
        this.progress = 0;
        this.points = 4; // 4-pointed stars like Persona 5
        this.innerRadiusRatio = 0.35;
    }
    
    /**
     * Updates the star's animation progress
     * @param {number} globalProgress - Overall animation progress (0-1)
     */
    update(globalProgress) {
        // Account for delay
        const adjustedProgress = Math.max(0, globalProgress - this.delay);
        
        // Cubic easing for snappier animation
        this.progress = adjustedProgress < 0.5
            ? 4 * adjustedProgress * adjustedProgress * adjustedProgress
            : 1 - Math.pow(-2 * adjustedProgress + 2, 3) / 2;
    }
    
    /**
     * Renders the star to the canvas context
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
     */
    draw(ctx) {
        if (this.progress <= 0) return;
        
        const currentRadius = this.maxRadius * this.progress;
        const innerRadius = currentRadius * this.innerRadiusRatio;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Create 4-pointed star path
        const step = Math.PI / this.points;
        ctx.beginPath();
        
        for (let i = 0; i < 2 * this.points; i++) {
            const radius = i % 2 === 0 ? currentRadius : innerRadius;
            const angle = i * step - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
    
    /**
     * Checks if the star has completed its animation
     * @returns {boolean} True if animation is complete
     */
    isComplete() {
        return this.progress >= 1;
    }
    
    /**
     * Resets the star's animation state
     */
    reset() {
        this.progress = 0;
    }
}

export default Star;