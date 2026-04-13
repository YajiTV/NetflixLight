(function initTmdbApi() {
  window.api = window.api || {};

  window.api.tmdb = {

    // GET /api/tmdb/home → trending, popularTv, topRated
    getHome: async function () {
      const res = await window.http('/api/tmdb/home');
      return res.json();
    },

    // GET /api/tmdb/genre/ → films d'un genre
    getGenre: async function (genreId) {
      const res = await window.http(`/api/tmdb/genre/${genreId}`);
      return res.json();
    },

    // GET /api/tmdb/detail/:type/:id → détail d'un film ou série
    getDetail: async function (mediaType, id) {
      const res = await window.http(`/api/tmdb/detail/${mediaType}/${id}`);
      if (!res || !res.ok) throw new Error('Impossible de charger les détails');
      return res.json();
    },

    // GET /api/tmdb/search?q=... → recherche
    search: async function (query) {
      const res = await window.http(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
      return res.json();
    },

  };
})();
