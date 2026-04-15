(function initRouter() {
  const routes = {
    '/': 'home',
    '/search': 'search',
    '/detail/:mediaType/:id': 'detail',
    '/watchlist': 'watchlist',
    '/player/:mediaType/:id': 'player',
    '/login': 'login',
    '/register': 'register',
    '/profile': 'profile',
  };

  function matchRoute(path) {
    if (routes[path]) return { page: routes[path], params: [] };

    for (const pattern of Object.keys(routes)) {
      if (!pattern.includes(':')) continue;
      const regex = new RegExp(`^${pattern.replace(/:\w+/g, '([^/]+)')}$`);
      const match = path.match(regex);
      if (match) {
        return { page: routes[pattern], params: match.slice(1) };
      }
    }

    return null;
  }

  function render() {
    window.scrollTo(0, 0);

    const app = document.getElementById('app');
    const matched = matchRoute(window.location.pathname || '/');

    if (!matched || !window.pages?.[matched.page]) {
      app.innerHTML = `
        ${window.components?.renderHeader ? window.components.renderHeader() : ''} 
        <main class="flex flex-col items-center justify-center py-20 px-6">
          <img src="/assets/images/ERROR 404.png" alt="Page introuvable" class="max-w-md w-full" />
          <a data-link href="/" class="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition">
            Retour à l'accueil
          </a>
        </main>
      `;
      if (window.components?.bindHeaderActions) window.components.bindHeaderActions();
      return;
    }

    window.pages[matched.page].render(app, ...matched.params);
    if (window.components?.renderFooter) {
      app.style.paddingBottom = "64px";
      app.insertAdjacentHTML("beforeend", window.components.renderFooter());
    }
    if (window.components?.bindHeaderActions) {
      window.components.bindHeaderActions();
    }
  }

  function init() {
    window.addEventListener('popstate', render);
    document.body.addEventListener('click', (event) => {
      const link = event.target.closest('[data-link]');
      if (!link) return;
      event.preventDefault();
      history.pushState({}, '', link.getAttribute('href'));
      render();
    });

    render();
  }

  function navigate(path) {
    history.pushState({}, '', path); 
    render();
  }

  window.router = { init, navigate};
})();
