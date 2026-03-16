(function () {
  window.pages = window.pages || {};
  window.pages.home = {
    render(container) {
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="p-8 max-w-6xl mx-auto">
          <section class="mt-8">
            <h1 class="text-3xl font-bold">Bienvenue sur NetflixLight</h1>
            <p class="mt-3 text-gray-300 max-w-2xl">
              Découvre des films et séries, crée ta watchlist et reprends là où tu t’es arrêté.
            </p>
          </section>
        </main>
      `;
    },
  };
})();
