(function initWatchlistApi() {
  window.api = window.api || {};

  window.api.watchlist = {

    // GET /api/watchlist → récupère toute la liste
    getAll: async function () {
      const res = await fetch('/api/watchlist', {
        credentials: 'include',
      });
      return res.ok ? res.json() : [];
    },

    // POST /api/watchlist → ajoute un film/série
    add: async function (item) {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return res;
    },

    // DELETE /api/watchlist/:id?type=... → supprime un film/série
    remove: async function (tmdbId, mediaType) {
      const res = await fetch(`/api/watchlist/${tmdbId}?type=${mediaType}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return res;
    },

  };
})();
