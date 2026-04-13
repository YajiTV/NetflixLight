(function initWatchlistApi() {
  window.api = window.api || {};

  window.api.watchlist = {

    // GET /api/watchlist → récupère toute la liste
    getAll: async function () {
      const res = await window.http('/api/watchlist');
      return res && res.ok ? res.json() : [];
    },

    // POST /api/watchlist → ajoute un film/série
    add: async function (item) {
      return window.http('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    },

    // DELETE /api/watchlist/:id?type=... → supprime un film/série
    remove: async function (tmdbId, mediaType) {
      return window.http(`/api/watchlist/${tmdbId}?type=${mediaType}`, {
        method: 'DELETE',
      });
    },

  };
})();
