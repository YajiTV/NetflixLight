(function initStore() {
  const state = {
    token: null,
    user: null,
    theme: 'dark',
  };

  window.store = {
    getState() {
      return state;
    },
  };
})();
