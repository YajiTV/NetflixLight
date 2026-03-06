/**
 * Netflix Clone - SPA Entry Point
 * Initialize router, store, and bootstrap the application
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Netflix Clone loading...');

  // Initialize store
  const appState = store.getState();
  console.log('📦 Store initialized:', appState);

  // Initialize router
  router.init();
  console.log('🛣️ Router initialized');

  // Bind layout links (header navigation)
  bindLayoutLinks();

  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (token) {
    console.log('✅ User token found, loading user profile...');
    // TODO: Load user profile from /api/user
  }

  // Apply theme
  applyTheme();

  console.log('✨ App ready');
});

function bindLayoutLinks() {
  document.querySelectorAll('#websiteheader a[data-link]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      router.navigate(new URL(a.href).pathname);
    });
  });
}

function applyTheme() {
  const theme = store.getState().theme;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Export for module usage
window.app = {
  router,
  store,
  applyTheme,
};