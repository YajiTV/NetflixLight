(function initHeader() {
  function renderHeader() {
    return `
      <header class="p-4 border-b border-gray-800">
        <nav class="max-w-6xl mx-auto flex gap-4">
          <a data-link href="/">Home</a>
          <a data-link href="/search">Search</a>
          <a data-link href="/watchlist">Watchlist</a>
          <a data-link href="/login">Login</a>
          <a href="#" id="logout-btn">Log out</a>
        </nav>
      </header>
    `;
  }

  function bindHeaderActions() {
    const btn = document.getElementById("logout-btn");

    btn.addEventListener("click", async (e) => {
      e.preventDefault(); //evite navigation
      try {
        await window.api.auth.logout();
        window.history.pushState({}, "", "/");
        window.router.init();
      } catch (err) {
        console.error(err);
      }
    });
  }

  window.components = window.components || {};
  window.components.renderHeader = renderHeader;
  window.components.bindHeaderActions = bindHeaderActions;
})();
