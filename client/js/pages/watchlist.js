(function () {
  window.pages = window.pages || {};
  window.pages.watchlist = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Watchlist page skeleton</main>`;
    },
  };
})();
