(function initHeader() {
  function renderHeader() {
    return `
      <header class="p-4 border-b border-gray-800">
        <nav class="max-w-6xl mx-auto flex gap-4">
          <a data-link href="/">Home</a>
          <a data-link href="/search">Search</a>
          <a data-link href="/watchlist">Watchlist</a>
          <a data-link href="/login">Login</a>
        </nav>
      </header>
    `;
  }

  window.components = window.components || {};
  window.components.renderHeader = renderHeader;
})();
