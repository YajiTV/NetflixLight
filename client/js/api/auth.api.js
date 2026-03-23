(function initAuthApi() {
  window.api = window.api || {};
  window.api.auth = {
    async register(username, email, password) {
      const res = await window.http('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Register failed');
      }
      return data.user;
    },

    async login(identifier, password) {
      const res = await wi('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data.user;
    },
    async logout() {
  const res = await window.http('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Logout failed');
  }
  return data;
},

  };
})();
