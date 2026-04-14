document.addEventListener('DOMContentLoaded', async () => {
  // check cookie valide
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      window.store.setUser(data.user);
    }
  } catch (_) {
    // pas connecté
  }

  window.router.init();
});
