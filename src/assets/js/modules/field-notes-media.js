// src/assets/js/modules/field-notes-media.js

/**
 * FIELD NOTES MEDIUM PICKER
 * On series pages with several media (Chiramune: product placements, songs, books…), the dropdown shows one
 * medium's cards at a time and swaps the page title to match. The choice goes in the address (#books) so a
 * link can open straight to it. Without scripts every medium shows, one after another.
 */
export function initFieldNotesMedia() {
  const root = document.querySelector('[data-notes-media]');
  const select = root?.querySelector('[data-notes-medium]');
  if (!root || !select || root.dataset.mediaReady) return;
  root.dataset.mediaReady = 'true';
  root.classList.add('is-enhanced');

  const panels = [...root.querySelectorAll('[data-notes-panel]')];
  const title = root.querySelector('[data-notes-title]');
  const keys = panels.map((p) => p.dataset.notesPanel);

  const show = (key, { updateAddress = true } = {}) => {
    if (!keys.includes(key)) key = keys[0];
    panels.forEach((panel) => { panel.hidden = panel.dataset.notesPanel !== key; });
    select.value = key;
    const option = select.selectedOptions[0];
    if (title && option?.dataset.title) title.textContent = option.dataset.title;
    // The first medium is the default, so its address stays clean
    if (updateAddress) history.replaceState(null, '', key === keys[0] ? location.pathname + location.search : `#${key}`);
  };

  select.addEventListener('change', () => show(select.value));
  window.addEventListener('hashchange', () => show(location.hash.slice(1), { updateAddress: false }));
  show(location.hash.slice(1), { updateAddress: false });
}
