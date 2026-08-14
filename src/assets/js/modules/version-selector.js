// src/assets/js/modules/version-selector.js

const SELECTOR_ATTRIBUTE = 'data-site-version-selector';
const TRIGGER_SELECTOR = '.site-version-selector__trigger';
const MENU_SELECTOR = '.site-version-selector__menu';
const OPTION_SELECTOR = '.site-version-selector__option[data-version-url]';

let isDocumentBindingsInstalled = false;

function initVersionSelector() {
  const wrapper = document.querySelector(`[${SELECTOR_ATTRIBUTE}]`);
  if (!wrapper || wrapper.dataset.versionSelectorInit === 'true') return;
  wrapper.dataset.versionSelectorInit = 'true';

  const trigger = wrapper.querySelector(TRIGGER_SELECTOR);
  const menu = wrapper.querySelector(MENU_SELECTOR);
  const options = wrapper.querySelectorAll(OPTION_SELECTOR);

  if (!trigger || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };

  const toggleMenu = (event) => {
    event.preventDefault();
    menu.hidden ? openMenu() : closeMenu();
  };

  const onOptionClick = (event) => {
    const url = event.currentTarget.dataset.versionUrl;
    if (!url) return;
    window.location.href = url;
  };

  trigger.addEventListener('click', toggleMenu);
  options.forEach((option) => {
    option.addEventListener('click', onOptionClick);
  });

  if (!isDocumentBindingsInstalled) {
    document.addEventListener('click', (event) => {
      if (wrapper.contains(event.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    isDocumentBindingsInstalled = true;
  }
}

export { initVersionSelector };