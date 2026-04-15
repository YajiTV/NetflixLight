document.addEventListener('DOMContentLoaded', async () => {
  // check valid cookie
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      window.store.setUser(data.user);
    }
  } catch (_) {
    // not logged in
  }

  window.router.init();
});
