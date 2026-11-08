// src/assets/js/modules/legacy-lightbox-modal.js

/**
 * LEGACY FICTIONS ARCHIVE IMAGE LIGHTBOX
 * Opens the screenshot and the card images that aren't links, like the old site did.
 * Linked card images (Monarch, BIRDS) keep navigating to their story.
 */
let lightboxGlobalKeydownBound = false;
const LIGHTBOX_BOUND_ATTR = 'data-lightbox-bound';
const TRIGGERS = '.fictions-archive-wrapper .images img, .fictions-archive-wrapper .image img';

export function initModernLightbox() {
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeBtn');
  const loadingSpinner = document.getElementById('loading');

  // Only the legacy fictions page carries the overlay markup
  if (!overlay || !modalImg) return;

  const images = [...document.querySelectorAll(TRIGGERS)].filter((img) => !img.closest('a'));
  let lastTrigger = null;

  // 1. OPEN MODAL EVENT LOGIC
  const openModal = (targetImg) => {
    lastTrigger = targetImg;
    if (loadingSpinner) loadingSpinner.style.display = 'block';
    modalImg.removeAttribute('src');
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const tempImg = new Image();
    tempImg.onload = tempImg.onerror = () => {
      modalImg.src = targetImg.currentSrc || targetImg.src;
      modalImg.alt = targetImg.alt;
      if (loadingSpinner) loadingSpinner.style.display = 'none';
    };
    tempImg.src = targetImg.currentSrc || targetImg.src;
    if (closeBtn) closeBtn.focus();
  };

  images.forEach((img) => {
    if (img.hasAttribute(LIGHTBOX_BOUND_ATTR)) return;
    img.setAttribute(LIGHTBOX_BOUND_ATTR, 'true');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => openModal(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(img);
      }
    });
  });

  // 2. CLOSE MODAL SHARED FUNCTIONS MODULE
  const closeModal = () => {
    if (!overlay.classList.contains('is-active')) return;
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  };

  if (closeBtn && !closeBtn.hasAttribute(LIGHTBOX_BOUND_ATTR)) {
    closeBtn.setAttribute(LIGHTBOX_BOUND_ATTR, 'true');
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });
  }

  // Global escape key check mechanism. Tab stays on the close button, the popup's only control.
  if (!lightboxGlobalKeydownBound) {
    document.addEventListener('keydown', (event) => {
      const open = document.getElementById('modalOverlay')?.classList.contains('is-active');
      if (!open) return;
      if (event.key === 'Escape') document.getElementById('closeBtn')?.click();
      if (event.key === 'Tab') {
        event.preventDefault();
        document.getElementById('closeBtn')?.focus();
      }
    });
    lightboxGlobalKeydownBound = true;
  }
}
