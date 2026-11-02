// src/assets/js/modules/hover-swap.js

/**
 * Drives a two-state image: a mouse shows the alternate while it's over the element,
 * a tap toggles it, and a tap anywhere else restores it.
 * Uses pointer events because a touchscreen laptop can have a mouse as well.
 */
function bindHoverSwap(element, setSwapped) {
  let swapped = false;
  let lastPointerType = '';

  const update = (next) => {
    swapped = next;
    setSwapped(next);
  };

  element.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') update(true);
  });

  element.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch') update(false);
  });

  element.addEventListener('pointerdown', (event) => {
    lastPointerType = event.pointerType;
  });

  // A click only follows a real tap, so a swipe that starts on the image still scrolls the page
  element.addEventListener('click', () => {
    if (lastPointerType === 'touch') update(!swapped);
  });

  // A touch that turns into a scroll never fires pointerup, so scrolling leaves the image as it is
  document.addEventListener('pointerup', (event) => {
    if (swapped && event.pointerType === 'touch' && !element.contains(event.target)) update(false);
  });
}

/**
 * Swaps an image's src for its data-hover-src.
 */
export function initImageHover(selector) {
  document.querySelectorAll(selector).forEach((img) => {
    const hoverSrc = img.getAttribute('data-hover-src');

    if (!hoverSrc) {
      console.warn('No hover source found for image:', img);
      return;
    }

    // Preload hover image
    const preloadImg = new Image();
    preloadImg.src = hoverSrc;

    const originalSrc = img.src;
    bindHoverSwap(img, (swapped) => {
      img.src = swapped ? hoverSrc : originalSrc;
    });
  });
}

/**
 * Crossfades the two stacked avatars on the legacy about page.
 */
export function initAvatarHover() {
  document.querySelectorAll('.about-avatar-hoverbox').forEach((box) => {
    bindHoverSwap(box, (swapped) => {
      box.classList.toggle('is-swapped', swapped);
    });
  });
}
