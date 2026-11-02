// src/assets/js/beer-tooltips.js

const POINTER_OFFSET = 20;
const EDGE_MARGIN = 8;

/**
 * LIGHT NOVEL BEER QUOTES MOUSE HOVER POPUPS
 * Shows a card's data-hover-quote in one shared panel that follows the pointer.
 */
export function initBeerQuotesTooltips() {
  // Grabs every single element on the canvas that has a data-hover-quote attribute
  const novelBeerCards = document.querySelectorAll('[data-hover-quote]');

  if (!novelBeerCards.length) return;

  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  tooltip.style.cssText = 'position: fixed; z-index: 1000; pointer-events: none; background-color: gold; border: 2px solid black; padding: 10px; color: #000000; font-size: 0.85rem; max-width: 280px; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border-radius: 4px; line-height: 1.4;';
  document.body.append(tooltip);

  const followPointer = (event) => {
    // Stay on screen when the pointer is near the right or bottom edge
    const x = Math.min(event.clientX + POINTER_OFFSET, window.innerWidth - tooltip.offsetWidth - EDGE_MARGIN);
    const y = Math.min(event.clientY + POINTER_OFFSET, window.innerHeight - tooltip.offsetHeight - EDGE_MARGIN);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };

  novelBeerCards.forEach(card => {
    card.addEventListener('mouseenter', (event) => {
      tooltip.innerHTML = card.getAttribute('data-hover-quote');
      tooltip.hidden = false;
      followPointer(event);
    });
    card.addEventListener('mousemove', followPointer);
    card.addEventListener('mouseleave', () => {
      tooltip.hidden = true;
    });
  });
}
