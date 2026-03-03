(function () {
  window.pages = window.pages || {};
  window.pages.login = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Login page skeleton</main>`;
    },
  };
})();
