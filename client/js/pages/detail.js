(function () {
  window.pages = window.pages || {};

  window.pages.detail = {
    render(container) {
       if (!window.store.getState().user) {
        container.innerHTML = `
          ${window.components.renderHeader()}
          <div class="flex items-center justify-center text-gray-400" style="height: 60vh;">
            Please log in to <a href="/login" data-link class="underline ml-1">/login</a>
          </div>
        `;
        return;
      }
      
      container.innerHTML = `
        ${window.components.renderHeader()}
        <main class="max-w-6xl mx-auto px-6 py-10">
          <h1 class="text-2xl font-bold">Détail</h1>
          <p class="mt-2 text-gray-400">Fonctionnalité à venir...</p>
        </main>
      `;
    }
  };
})();
