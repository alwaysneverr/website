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
    buttonEl.classList = isDark
      ? "theme_toggle"
      : "theme_toggle light-theme";

    const newAriaLabel = isDark
      ? "Change to light theme"
      : "Change to dark theme";

    buttonEl.setAttribute("aria-label", newAriaLabel);
  }
  
/**
  * Utility function to update the theme setting on the html tag
*/
export function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}