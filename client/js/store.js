/**
 * Global State Store
 * Manages: auth, theme, user profile, watchlist
 */

const store = {
  state: {
    user: null,
    isAuthenticated: false,
    theme: localStorage.getItem('theme') || 'dark',
    currentPage: 'home',
    watchlist: [],
    favorites: [],
  },

  setUser(user) {
    this.state.user = user;
    this.state.isAuthenticated = !!user;
  },

  logout() {
    this.state.user = null;
    this.state.isAuthenticated = false;
    localStorage.removeItem('token');
  },

  setTheme(theme) {
    this.state.theme = theme;
    localStorage.setItem('theme', theme);
  },

  setCurrentPage(page) {
    this.state.currentPage = page;
  },

  addToWatchlist(movie) {
    if (!this.state.watchlist.find(m => m.id === movie.id)) {
      this.state.watchlist.push(movie);
    }
  },

  removeFromWatchlist(movieId) {
    this.state.watchlist = this.state.watchlist.filter(m => m.id !== movieId);
  },

  toggleFavorite(movie) {
    const index = this.state.favorites.findIndex(m => m.id === movie.id);
    if (index > -1) {
      this.state.favorites.splice(index, 1);
    } else {
      this.state.favorites.push(movie);
    }
  },

  getState() {
    return this.state;
  },
};
