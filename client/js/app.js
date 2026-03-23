document.addEventListener('DOMContentLoaded', async () => {
  // check cookie valide
  try {
    const res = await window.http('/api/auth/me');
    if (res && res.ok) {
      const data = await res.json();
      window.store.setUser(data.user);
    }
  } catch (_) {
    // pas connecté, c'est normal
  }

  window.router.init();
});
