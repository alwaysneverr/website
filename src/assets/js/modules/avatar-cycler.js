// src/assets/js/modules/avatar-cycler.js

/**
 * AUTOMATED HOMEPAGE PROFILE AVATAR CYCLER ENGINE
 * Modernized Vanilla JS — Smooth crossfades with zero flash glitches!
 */
export function initAvatarCycler() {
  const avatarImg = document.getElementById('dynamicHeroAvatar');
  if (!avatarImg) return;

  // 1. EXTRACT AND PARSE IMAGE ARRAYS POOL
  const rawPoolData = avatarImg.getAttribute('data-avatar-pool');
  let imagePool = [];
  
  try {
    imagePool = JSON.parse(rawPoolData);
  } catch (error) {
    console.warn("⚠️ Avatar Cycler: Failed to parse structural data pool string layout.", error);
    return;
  }

  if (!imagePool || imagePool.length <= 1) return;

  console.log(`🎭 Avatar Engine: Active rotation track loaded for ${imagePool.length} distinct asset frames.`);

  // 2. RANDOM INITIAL ENTRY: Pick a random image to display on fresh page load entry points
  let currentActiveIndex = Math.floor(Math.random() * imagePool.length);
  avatarImg.src = imagePool[currentActiveIndex];

  // 3. BACKGROUND TIMELINE RE-LOOP (Fades frames smoothly every 6 seconds)
  setInterval(() => {
    // Select the next sequential image slot mapping item index securely
    currentActiveIndex = (currentActiveIndex + 1) % imagePool.length;
    const nextImageSourceUrl = imagePool[currentActiveIndex];

    // Trigger native CSS opacity fade-out sequence animation
    avatarImg.style.opacity = '0';

    // Wait for the opacity fade duration loop (300ms) to complete before swapping paths
    setTimeout(() => {
      // Pre-load tracking checkpoint asset safety mapping
      const preloaderImg = new Image();
      preloaderImg.src = nextImageSourceUrl;
      
      preloaderImg.onload = () => {
        avatarImg.src = nextImageSourceUrl;
        avatarImg.style.opacity = '1'; // Trigger hardware fade back in cleanly
      };
    }, 300);

  }, 6000); // 6000ms = 6 Seconds display visibility frame duration loop
}
