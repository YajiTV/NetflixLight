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
    if (routes[path]) return { page: routes[path], params: {} };

    for (const pattern of Object.keys(routes)) {
      if (!pattern.includes(':')) continue;
      const regex = new RegExp(`^${pattern.replace(/:\\w+/g, '[^/]+')}$`);
      if (regex.test(path)) {
        return { page: routes[pattern], params: {} };
      }
    }

    return null;
  }

  function render() {
    const app = document.getElementById('app');
    const matched = matchRoute(window.location.pathname || '/');

    if (!matched || !window.pages?.[matched.page]) {
      app.innerHTML = '<main class="p-8">404</main>';
      return;
    }

    window.pages[matched.page].render(app, matched.params);
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
