(function initTheme() {
  window.theme = {

    // Apply theme
    init: function () {
      const saved = localStorage.getItem('theme') || 'dark';
      this.apply(saved);
    },

    // Apply a dark or light theme
    apply: function (name) {
      if (name === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('theme', name);
    },

    // toggle between the two
    toggle: function () {
      const isLight = document.documentElement.classList.contains('light');
      this.apply(isLight ? 'dark' : 'light');
      // Update the header button icon
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) btn.textContent = isLight ? '☀️' : '🌒';
    },

    // Return the current theme
    current: function () {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    },

  };

  // Apply immediately
  window.theme.init();
})();
