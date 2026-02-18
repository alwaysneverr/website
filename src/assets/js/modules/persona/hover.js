// imageHover.js
export class ImageHover {
    constructor(selector, options = {}) {
        this.images = document.querySelectorAll(selector);
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.options = {
            hoverSrcAttr: options.hoverSrcAttr || 'data-hover-src',
            preload: options.preload !== false, // default true
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.images.forEach(img => {
            const hoverSrc = img.getAttribute(this.options.hoverSrcAttr);
            
            if (!hoverSrc) {
                console.warn('No hover source found for image:', img);
                return;
            }
            
            // Preload hover image
            if (this.options.preload) {
                const preloadImg = new Image();
                preloadImg.src = hoverSrc;
            }
            
            // Store original src
            const originalSrc = img.src;
            
            if (this.isTouchDevice) {
                this.addTouchEvents(img, originalSrc, hoverSrc);
            } else {
                this.addMouseEvents(img, originalSrc, hoverSrc);
            }
        });
    }
    
    addMouseEvents(img, originalSrc, hoverSrc) {
        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });
        
        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    }
    
    addTouchEvents(img, originalSrc, hoverSrc) {
        let isToggled = false;
        
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (isToggled) {
                img.src = originalSrc;
                isToggled = false;
            } else {
                img.src = hoverSrc;
                isToggled = true;
            }
        });
        
        // Optional: reset when tapping outside
        if (this.options.resetOnTapOutside) {
            document.addEventListener('touchstart', (e) => {
                if (e.target !== img && isToggled) {
                    img.src = originalSrc;
                    isToggled = false;
                }
            });
        }
    }
    
    destroy() {
        // Clean up event listeners if needed
        this.images.forEach(img => {
            const newImg = img.cloneNode(true);
            img.parentNode.replaceChild(newImg, img);
        });
    }
}

// Convenience function for simple usage
export function initImageHover(selector, options) {
    return new ImageHover(selector, options);
}