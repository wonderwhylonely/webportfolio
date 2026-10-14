/**
 * Theme Switcher Script
 */
(function () {
  const THEME_KEY = 'portfolio_theme';
  const root = document.documentElement;

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('title', 'โหมดมืด (Dark Mode)');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('title', 'โหมดสว่าง (Light Mode)');
        }
      }
    });
  }

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  window.toggleTheme = toggleTheme;
})();
