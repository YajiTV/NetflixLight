(function () {
  window.pages = window.pages || {};
  window.pages.search = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Search page skeleton</main>`;
    },
  };
})();
