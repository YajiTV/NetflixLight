(function initProfileApi() {
  window.api = window.api || {};

  window.api.profiles = {

    // GET /api/profiles → all profiles of the logged-in user
    getAll: async function () {
      const res = await fetch('/api/profiles', { credentials: 'include' });
      return res.ok ? res.json() : [];
    },

    // POST /api/profiles → create a new profile
    create: async function (name, avatar) {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatar }),
      });
      return res;
    },

    // DELETE /api/profiles/:id → delete a profile
    remove: async function (id) {
      const res = await fetch(`/api/profiles/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return res;
    },

  };
})();
