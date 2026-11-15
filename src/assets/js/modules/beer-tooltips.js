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

  // Keyboard focus has no pointer, so the panel sits under the card instead
  const belowCard = (card) => {
    const rect = card.getBoundingClientRect();
    const x = Math.min(Math.max(rect.left, EDGE_MARGIN), window.innerWidth - tooltip.offsetWidth - EDGE_MARGIN);
    const below = rect.bottom + EDGE_MARGIN;
    const y = below + tooltip.offsetHeight > window.innerHeight ? rect.top - tooltip.offsetHeight - EDGE_MARGIN : below;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${Math.max(y, EDGE_MARGIN)}px`;
  };

  // On touch screens a tap opens the quote in a modal instead (field-notes-quote-modal.js), so a tap skips this popup.
  // Pointer events arrive before the mouse events a browser fakes after a tap, so they say which input it was;
  // a key press clears it, so tabbing to a card shows the popup even on a touch screen with a keyboard.
  let lastPointerType = '';
  document.addEventListener('pointerdown', (event) => { lastPointerType = event.pointerType; }, true);
  document.addEventListener('pointerover', (event) => { lastPointerType = event.pointerType; }, true);
  document.addEventListener('keydown', () => { lastPointerType = ''; }, true);
  const isModalTouch = () => lastPointerType !== '' && lastPointerType !== 'mouse';

  novelBeerCards.forEach(card => {

    card.addEventListener('mouseenter', (event) => {
      if (isModalTouch()) return;
      tooltip.innerHTML = card.getAttribute('data-hover-quote');
      tooltip.hidden = false;
      followPointer(event);
    });
    card.addEventListener('mousemove', (event) => {
      if (!isModalTouch()) followPointer(event);
    });
    card.addEventListener('mouseleave', () => {
      if (isModalTouch()) return;
      if (document.activeElement === card) belowCard(card);
      else tooltip.hidden = true;
    });
    card.addEventListener('focus', () => {
      // A tap also focuses the card; only keyboard (or mouse) focus shows the popup
      if (isModalTouch()) return;
      tooltip.innerHTML = card.getAttribute('data-hover-quote');
      tooltip.hidden = false;
      belowCard(card);
    });
    card.addEventListener('blur', () => {
      tooltip.hidden = true;
    });
  });
}
