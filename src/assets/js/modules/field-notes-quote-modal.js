// src/assets/js/modules/field-notes-quote-modal.js

/**
 * QUOTE CARDS ON TOUCH SCREENS
 * A mouse gets each card's quote in the hover popup (beer-tooltips.js). A touch screen has no hover, so tapping
 * a card opens its quote in a modal instead. Close it with the button, by tapping outside it, or with Escape.
 * Covers every card with a data-hover-quote: the Field Notes cards and the legacy beer page's cards.
 * Uses pointer events rather than screen width, so a tablet gets the modal and a touchscreen laptop's mouse
 * still gets the popup. Links and buttons inside a card (Spotify, "See it on the board") work as before.
 */
const CARD_SELECTOR = '[data-hover-quote]';
// The card's name, for the modal's heading: Field Notes cards, then the legacy beer page's
const NAME_SELECTOR = '.field-notes__name, .beer-name';

export function initFieldNotesQuoteModal() {
  const cards = document.querySelectorAll(CARD_SELECTOR);
  if (!cards.length || document.getElementById('field-notes-quote')) return;

  const dialog = document.createElement('dialog');
  dialog.id = 'field-notes-quote';
  dialog.className = 'field-notes-quote';
  dialog.setAttribute('aria-labelledby', 'field-notes-quote-title');
  dialog.tabIndex = -1;
  dialog.innerHTML = `
    <div class="field-notes-quote__header">
      <h2 class="field-notes-quote__title" id="field-notes-quote-title"></h2>
      <button type="button" class="field-notes-quote__close" aria-label="Close quote">×</button>
    </div>
    <p class="field-notes-quote__body"></p>`;
  // On <body>, outside the Field Notes block, so the page theme's card and heading styles don't reach it
  document.body.append(dialog);

  const title = dialog.querySelector('.field-notes-quote__title');
  const body = dialog.querySelector('.field-notes-quote__body');
  dialog.querySelector('.field-notes-quote__close').addEventListener('click', () => dialog.close());
  // A tap on the dimmed backdrop lands on the dialog element itself, outside its content box
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
    if (!inside) dialog.close();
  });

  cards.forEach((card) => {
    let lastPointerType = '';
    card.addEventListener('pointerdown', (event) => { lastPointerType = event.pointerType; });
    // A click only follows a real tap, so a swipe that starts on a card still scrolls the page
    card.addEventListener('click', (event) => {
      if (lastPointerType === 'mouse' || !lastPointerType) return;
      if (event.target.closest('a, button')) return;
      title.textContent = card.querySelector(NAME_SELECTOR)?.textContent.trim() || '';
      // The quote markup is the site's own (src/_data and the legacy page), the same markup the hover popup shows
      body.innerHTML = card.getAttribute('data-hover-quote');
      dialog.showModal();
      // Focus the box itself rather than the close button, which would otherwise show a keyboard focus ring
      // after a tap; Tab still reaches the button
      dialog.focus();
    });
  });
}
