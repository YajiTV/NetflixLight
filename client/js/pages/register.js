(function () {
  window.pages = window.pages || {};
  window.pages.register = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Register page skeleton</main>`;
    },
  };
})();
