const WatchlistModel = require('../models/watchlist.model');

module.exports = {
  getAll: (userId) => WatchlistModel.getAll(userId),

  add: (userId, { tmdb_id, media_type, title, poster_path }) =>
    WatchlistModel.add({ userId, tmdbId: tmdb_id, mediaType: media_type, title, posterPath: poster_path }),

  remove: (userId, tmdbId, mediaType) =>
    WatchlistModel.remove(userId, tmdbId, mediaType),
};
