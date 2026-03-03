const db = require("../config/db");

const WatchlistModel = {
  getAll: (userId) =>
    db.prepare("SELECT * FROM watchlist WHERE user_id = ? ORDER BY added_at DESC").all(userId),

  add: ({ userId, tmdbId, mediaType, title, posterPath }) =>
    db.prepare(`
      INSERT OR IGNORE INTO watchlist (user_id, tmdb_id, media_type, title, poster_path)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, tmdbId, mediaType, title, posterPath),

  remove: (userId, tmdbId, mediaType) =>
    db.prepare("DELETE FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?").run(userId, tmdbId, mediaType),

  exists: (userId, tmdbId, mediaType) =>
    !!db.prepare("SELECT 1 FROM watchlist WHERE user_id = ? AND tmdb_id = ? AND media_type = ?").get(userId, tmdbId, mediaType),
};

module.exports = WatchlistModel;
