(function initTmdbApi() {
  window.api = window.api || {};

  window.api.tmdb = {

    // GET /api/tmdb/home → trending, popularTv, topRated
    getHome: async function () {
      const res = await window.http('/api/tmdb/home');
      return res.json();
    },

    // GET /api/tmdb/genre/ → movies of a genre
    getGenre: async function (genreId) {
      const res = await window.http(`/api/tmdb/genre/${genreId}`);
      return res.json();
    },

    // GET /api/tmdb/detail/:type/:id → detail of a movie or series
    getDetail: async function (mediaType, id) {
      const res = await window.http(`/api/tmdb/detail/${mediaType}/${id}`);
      if (!res || !res.ok) throw new Error('Impossible to load details');
      return res.json();
    },

    // GET /api/tmdb/search?q=... → search
    search: async function (query) {
      const res = await window.http(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
      return res.json();
    },

  };
})();
