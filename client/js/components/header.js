(function initHeader() {
  function renderHeader() {
    return `
      <header class="p-4 border-b border-gray-800">
        <nav class="max-w-6xl mx-auto flex gap-4">
          <a data-link href="/">Home</a>
          <a data-link href="/search">Search</a>
          <a data-link href="/watchlist">Watchlist</a>
          <a data-link href="/login">Login</a>
          <a data-link href="/register">Register</a>
          <a data-link href="/profile" id="profile-btn">Profile</a>
          <a href="#" id="logout-btn" class="text-red-600">Log out</a>
          <button id="theme-toggle-btn" class="ml-auto text-lg">
            ${window.theme && window.theme.current() === 'light' ? '🌒' : '☀️'}
          </button>
        </nav>
      </header>
    `;
  }

  function bindHeaderActions() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        window.theme.toggle();
      });
    }
    const btn = document.getElementById("logout-btn");
    if (!btn) return;

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      try {
        await window.api.auth.logout();
      } catch (err) {
        console.error('Logout API error:', err);
      } finally {
        window.store.cleanUser();
        window.router.navigate('/');
      }
    });
  }

  window.components = window.components || {};
  window.components.renderHeader = renderHeader;
  window.components.bindHeaderActions = bindHeaderActions;
})();
