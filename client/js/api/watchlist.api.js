(function initWatchlistApi() {
  window.api = window.api || {};

  window.api.watchlist = {

    // GET /api/watchlist → fetch the entire list
    getAll: async function () {
      const res = await window.http('/api/watchlist');
      return res && res.ok ? res.json() : [];
    },

    // POST /api/watchlist → add a movie/series
    add: async function (item) {
      return window.http('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    },

    // DELETE /api/watchlist/:id?type=... → remove a movie/series
    remove: async function (tmdbId, mediaType) {
      return window.http(`/api/watchlist/${tmdbId}?type=${mediaType}`, {
        method: 'DELETE',
      });
    },

  };
})();
