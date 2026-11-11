// src/assets/js/modules/field-notes-image-fallback.js

const FALLBACK_SRC = '/assets/images/default-fallback.png';

/**
 * FIELD NOTES HOTLINKED IMAGE FALLBACK
 * Item images live on shop and brewery sites, so swap in the fallback when one disappears.
 */
export function initFieldNotesImageFallbacks() {
  const swap = (img) => {
    img.removeAttribute('data-field-notes-image');
    img.src = FALLBACK_SRC;
    img.alt = '';
  };

  document.querySelectorAll('img[data-field-notes-image]').forEach((img) => {
    // Some may have already failed before this module ran
    if (img.complete && img.naturalWidth === 0) {
      swap(img);
      return;
    }
    img.addEventListener('error', () => swap(img), { once: true });
  });
}
