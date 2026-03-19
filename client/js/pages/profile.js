(function () {
  window.pages = window.pages || {};

  window.pages.profile = {
    render(container) {
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 py-10">
          <h1 class="text-2xl font-bold">Mon Profil</h1>
          <p class="mt-2 text-gray-400">Fonctionnalité à venir...</p>
        </main>
      `;
    }
  };
})();
