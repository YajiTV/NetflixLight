(function initStore() {
  const state = {
    user: null,
    theme: 'dark',
  };
  window.store = {
    getState() {
      return state;
    },
    setUser(user) {
      state.user = user; 
    },
    cleanUser() {
      state.user = null;
    }
  }
})