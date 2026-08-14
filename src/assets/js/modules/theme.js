/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
export function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

/**
 * Utility function to update the button text and aria-label.
 */
export function updateButton({ buttonEl, isDark }) {
  if (!buttonEl) return;
  
  // Clean component tracking indicators
  buttonEl.setAttribute("data-theme-active", isDark ? "dark" : "light");
  
  const newAriaLabel = isDark ? "Change to light theme" : "Change to dark theme";
  buttonEl.setAttribute("aria-label", newAriaLabel);

  // Dynamically toggle internal icon view text parameters
  const darkIcon = buttonEl.querySelector('.theme-icon-dark');
  const lightIcon = buttonEl.querySelector('.theme-icon-light');
  
  if (darkIcon && lightIcon) {
    if (isDark) {
      darkIcon.style.display = 'inline-block';
      lightIcon.style.display = 'none';
    } else {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'inline-block';
    }
  }
}

/**
 * Utility function to update the theme setting on the html tag
 */
export function updateThemeOnHtmlEl({ theme }) {
  document.documentElement.setAttribute("data-theme", theme);
}
