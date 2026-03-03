(function () {
  window.pages = window.pages || {};
  window.pages.profile = {
    render(container) {
      container.innerHTML = `${window.components.renderHeader()}<main class="p-8 max-w-6xl mx-auto">Profile page skeleton</main>`;
    },
  };
})();
