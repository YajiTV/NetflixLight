(function () {
  window.pages = window.pages || {};
  window.pages.detail = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Detail page skeleton</main>`;
    },
  };
})();
