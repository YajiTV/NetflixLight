/**
 * Client-Side Router
 * Uses History API for SPA navigation
 */

const router = {
  routes: {
    '/': 'home',
    '/search': 'search',
    '/detail/:id': 'detail',
    '/watchlist': 'watchlist',
    '/player/:id': 'player',
    '/login': 'login',
    '/register': 'register',
    '/profile': 'profile',
  },

  currentRoute: '/',

  init() {
    window.addEventListener('popstate', () => this.render());
    this.render();
  },

  navigate(path) {
    if (path !== this.currentRoute) {
      this.currentRoute = path;
      window.history.pushState({ path }, null, path);
      this.render();
    }
  },

  render() {
    const app = document.getElementById('app');
    // update currentRoute from location (supports direct links / refresh)
    this.currentRoute = this.getCurrentPath();

    // find matching route key (supports simple param routes like /detail/:id)
    const routeKey = this.matchRoute(this.currentRoute);
    const pageName = this.routes[routeKey] || 'not-found';

    // If a page component exists under window.pages, delegate rendering to it
    const container = app;
    const params = {};

    // extract params for param routes (e.g., /detail/:id)
    if (routeKey && routeKey.includes(':')) {
      const keyParts = routeKey.split('/').filter(Boolean);
      const pathParts = this.currentRoute.split('/').filter(Boolean);
      keyParts.forEach((part, idx) => {
        if (part.startsWith(':')) {
          params[part.slice(1)] = pathParts[idx];
        }
      });
    }

    if (window.pages && window.pages[pageName] && typeof window.pages[pageName].render === 'function') {
      window.pages[pageName].render(container, params);
    } else {
      // fallback simple render
      container.innerHTML = `\n      <div class="min-h-screen p-6">\n        <header class="mb-6">\n          <nav class="flex gap-4">\n            <a href="/" data-link class="text-blue-600">Home</a>\n            <a href="/search" data-link class="text-blue-600">Search</a>\n            <a href="/watchlist" data-link class="text-blue-600">Watchlist</a>\n          </nav>\n        </header>\n        <main>\n          <h1 class="text-2xl font-semibold">Page: ${pageName}</h1>\n          <p class="text-gray-600 mt-2">Route: ${this.currentRoute}</p>\n        </main>\n      </div>\n    `;

      // attach client-side navigation to links with data-link
      container.querySelectorAll('a[data-link]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigate(new URL(a.href).pathname);
        });
      });
    }
  },

  matchRoute(path) {
    // exact match first
    if (this.routes[path]) return path;
    // try param routes like /detail/:id
    for (const key of Object.keys(this.routes)) {
      if (key.includes(':')) {
        const pattern = new RegExp('^' + key.replace(/:\w+/g, '[^/]+') + '$');
        if (pattern.test(path)) return key;
      }
    }
    return null;
  },

  getCurrentPath() {
    return window.location.pathname || '/';
  },
};
