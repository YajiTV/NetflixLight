(function initProfileApi() {
  window.api = window.api || {};

  window.api.profiles = {

    // GET /api/profiles → all profiles of the logged-in user
    getAll: async function () {
      const res = await window.http('/api/profiles');
      return res && res.ok ? res.json() : [];
    },

    // POST /api/profiles → create a new profile
    create: async function (name, avatar) {
      return window.http('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatar }),
      });
    },

    // DELETE /api/profiles/:id → delete a profile
    remove: async function (id) {
      return window.http(`/api/profiles/${id}`, {
        method: 'DELETE',
      });
    },

  };
})();
