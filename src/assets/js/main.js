// src/assets/js/main.js

// Focus Visible Polyfill
import 'focus-visible';

// Internal Modules
import * as theme from './modules/theme.js';
import { initModernLightbox } from './modules/legacy-lightbox-modal';
import './modules/legacy-testquery.js';
import { initBeerQuotesTooltips } from './modules/beer-tooltips.js';
import { initVersionSelector } from './modules/version-selector';
import { initAvatarCycler } from './modules/avatar-cycler.js';

// 1. FIXED GLOBAL SCOPE ANCHOR: Tracks your active theme state globally across all pages!
let currentThemeSetting = "dark";

/**
 * PRODUCTION ARCHITECTURE: UNIFIED SITE INITIALIZATION MATRIX
 * Re-runs on every single router page-swap to re-bind newly injected DOM elements.
 */
function initThemeEngine() {
  const button = document.querySelector('[data-theme-toggle="true"]');
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  // 2. Fetch the active theme configurations string token natively
  currentThemeSetting = theme.calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

  // 3. Synchronize visual button attributes and inject theme onto root <html> node
  if (button) {
    theme.updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  }
  theme.updateThemeOnHtmlEl({ theme: currentThemeSetting });

  // 4. SECURE BINDING: Attach click event handler listener cleanly onto your toggle button
  if (button) {
    // Safety cleanup: removes old duplicate pointers before applying a fresh hook
    button.removeEventListener("click", handleThemeToggle);
    button.addEventListener("click", handleThemeToggle);
  }
}

/**
 * Named event tracking handler callback to toggle the active theme state
 */
function handleThemeToggle() {
  const button = document.querySelector('[data-theme-toggle="true"]');
  if (!button) return;

  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  
  theme.updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  theme.updateThemeOnHtmlEl({ theme: newTheme });
  
  currentThemeSetting = newTheme; // Update the global scope pointer cleanly
}

/**
 * GLOBAL LIFECYCLE CONTROLLER ORCHESTRATION LOOP
 */

// 1. INITIAL ACTIONS PIPELINE: Run the builders on initial hard browser load entry points
function initPageModules() {
  initThemeEngine();
  initBeerQuotesTooltips();
  initModernLightbox();
  initVersionSelector();
  initAvatarCycler();
}

document.addEventListener('DOMContentLoaded', () => {
  initPageModules();
});
