(function initTmdbApi() {
  window.api = window.api || {};

  window.api.tmdb = {

    // GET /api/tmdb/home → trending, popularTv, topRated
    getHome: async function () {
      const res = await fetch('/api/tmdb/home', { credentials: 'include' });
      return res.json();
    },

    // GET /api/tmdb/genre/:id → films d'un genre
    getGenre: async function (genreId) {
      const res = await fetch(`/api/tmdb/genre/${genreId}`, { credentials: 'include' });
      return res.json();
    },

    // GET /api/tmdb/detail/:type/:id → détail d'un film ou série
    getDetail: async function (mediaType, id) {
      const res = await fetch(`/api/tmdb/detail/${mediaType}/${id}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Impossible de charger les détails');
      return res.json();
    },

    // GET /api/tmdb/search?q=... → recherche
    search: async function (query) {
      const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`, { credentials: 'include' });
      return res.json();
    },

  };
})();
