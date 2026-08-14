// src/assets/js/beer-tooltips.js

/**
 * AUTOMATION LAYOUT INITIALIZER: LIGHT NOVEL BEER QUOTES MOUSE HOVER POPUPS
 * Automatically hooks up your modern MouseFollow windows to your data attributes!
 */
export function initBeerQuotesTooltips() {
  // Grabs every single element on the canvas that has a data-hover-quote attribute
  const novelBeerCards = document.querySelectorAll('[data-hover-quote]');

  if (!novelBeerCards.length) return;

  console.log(`🍺 Beer Engine: Activating hover quote tracking nodes for ${novelBeerCards.length} database blocks.`);

  novelBeerCards.forEach(card => {
    // Dynamically pull the light novel quote text out of your HTML element tag data block
    const novelQuoteString = card.getAttribute('data-hover-quote');

    // Boot up the native mousefollow instance for this specific card matrix
    new MouseFollow(card, {
      // Re-applies your classic visual presentation parameters: gold panel, black frame outline
      html: `
        <div style="background-color: gold; border: 2px solid black; padding: 10px; color: #000000; font-size: 0.85rem; max-width: 280px; text-align: left; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border-radius: 4px; line-height: 1.4;">
          ${novelQuoteString}
        </div>
      `,
      speed: 150,
      x: 20,
      y: 20
    });
  });
}
