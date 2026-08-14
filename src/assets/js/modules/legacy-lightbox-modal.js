// src/assets/js/modules/legacy-lightbox-modal.js

/**
 * PORTFOLIO HUB IMAGE LIGHTBOX OVERLAY ENGINE
 * Isolated strictly to Legacy Pages via structural container classes!
 */
let lightboxGlobalKeydownBound = false;
const LIGHTBOX_BOUND_ATTR = 'data-lightbox-bound';

export function initModernLightbox() {
  // FIX: Swapped global tracker to target ONLY images nested inside old .legacy-content-archive layout cells!
  const images = document.querySelectorAll('.legacy-content-archive .image');
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.getElementById('closeBtn');
  const loadingSpinner = document.getElementById('loading');

  // If there are no legacy images or modal overlay panels present on this view, exit quietly!
  if (!images.length || !overlay || !modalImg) return;

  console.log(`📸 Legacy Lightbox Matrix: Active tracking established over ${images.length} retro archive nodes.`);

  // 1. OPEN MODAL EVENT LOGIC
  images.forEach(card => {
    if (card.hasAttribute(LIGHTBOX_BOUND_ATTR)) return;
    card.setAttribute(LIGHTBOX_BOUND_ATTR, 'true');
    
    card.addEventListener('click', (event) => {
      // Blocks normal page link routing ONLY for legacy entries!
      event.preventDefault();
      
      const targetImg = card.querySelector('img');
      if (!targetImg) return;

      if (loadingSpinner) loadingSpinner.style.display = 'block';
      overlay.classList.add('is-active');
      overlay.style.display = 'flex';

      const tempImg = new Image();
      tempImg.src = targetImg.src;
      tempImg.onload = () => {
        modalImg.src = targetImg.src;
        if (loadingSpinner) loadingSpinner.style.display = 'none';
      };
    });
  });

  // 2. CLOSE MODAL SHARED FUNCTIONS MODULE
  const closeModal = () => {
    overlay.classList.remove('is-active');
    overlay.style.display = 'none';
    modalImg.src = ''; // Flush image cache strings to save device memory footprint lines
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  // Global escape key check mechanism
  if (!lightboxGlobalKeydownBound) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.style.display === 'flex') closeModal();
    });
    lightboxGlobalKeydownBound = true;
  }
}
