// src/assets/js/modules/nav-dropdown.js

const DROPDOWN_SELECTOR = '[data-nav-dropdown]';
const TOGGLE_SELECTOR = '.custom-menu__toggle';
const MENU_SELECTOR = '.custom-menu__submenu';
const HOVER_CLOSE_DELAY = 150;

let isDocumentBindingsInstalled = false;

/**
 * PRIMARY NAVIGATION DROPDOWNS (FIELD NOTES)
 * The arrow button toggles the submenu; mouse users also get it on hover.
 * Without JavaScript the parent link still leads to a page listing the same entries.
 */
function initNavDropdowns() {
  const dropdowns = document.querySelectorAll(DROPDOWN_SELECTOR);
  if (!dropdowns.length) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  const setOpen = (dropdown, open) => {
    const toggle = dropdown.querySelector(TOGGLE_SELECTOR);
    const menu = dropdown.querySelector(MENU_SELECTOR);
    if (!toggle || !menu) return;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };

  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.navDropdownInit === 'true') return;
    dropdown.dataset.navDropdownInit = 'true';

    const toggle = dropdown.querySelector(TOGGLE_SELECTOR);
    const menu = dropdown.querySelector(MENU_SELECTOR);
    if (!toggle || !menu) return;
    let closeTimer = null;
    // Hovering opens it first, so a click while hover-opened keeps it open instead of closing it
    let openedByHover = false;

    toggle.addEventListener('click', () => {
      if (!menu.hidden && openedByHover) {
        openedByHover = false;
        return;
      }
      openedByHover = false;
      setOpen(dropdown, menu.hidden);
    });

    dropdown.addEventListener('mouseenter', () => {
      if (!canHover.matches) return;
      clearTimeout(closeTimer);
      if (menu.hidden) openedByHover = true;
      setOpen(dropdown, true);
    });
    dropdown.addEventListener('mouseleave', () => {
      if (!canHover.matches || !openedByHover) return;
      closeTimer = setTimeout(() => {
        openedByHover = false;
        setOpen(dropdown, false);
      }, HOVER_CLOSE_DELAY);
    });

    // Tabbing past the last entry closes it
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) setOpen(dropdown, false);
    });
  });

  if (!isDocumentBindingsInstalled) {
    document.addEventListener('click', (event) => {
      document.querySelectorAll(DROPDOWN_SELECTOR).forEach((dropdown) => {
        if (!dropdown.contains(event.target)) setOpen(dropdown, false);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll(DROPDOWN_SELECTOR).forEach((dropdown) => {
        const wasFocusedInside = dropdown.contains(document.activeElement);
        setOpen(dropdown, false);
        if (wasFocusedInside) dropdown.querySelector(TOGGLE_SELECTOR)?.focus();
      });
    });

    isDocumentBindingsInstalled = true;
  }
}

export { initNavDropdowns };
