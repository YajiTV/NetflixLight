(function initTheme() {
  window.theme = {

    // Applique le thème save
    init: function () {
      const saved = localStorage.getItem('theme') || 'dark';
      this.apply(saved);
    },

    // Applique un thème dark ou light
    apply: function (name) {
      if (name === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('theme', name);
    },

    // switch entre les deux
    toggle: function () {
      const isLight = document.documentElement.classList.contains('light');
      this.apply(isLight ? 'dark' : 'light');
      // Met à jour l'icône du bouton dans le header
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) btn.textContent = isLight ? '☀️' : '🌙';
    },

    // Retourne le thème actuel
    current: function () {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    },

  };

  // Appliquer immédia
  window.theme.init();
})();
