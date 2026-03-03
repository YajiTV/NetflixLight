const db = require("../config/db");

const ProgressModel = {
  upsert: ({ userId, tmdbId, mediaType, title, posterPath, progress, duration }) =>
    db.prepare(`
      INSERT INTO watch_progress (user_id, tmdb_id, media_type, title, poster_path, progress, duration, completed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, tmdb_id, media_type)
      DO UPDATE SET
        progress   = excluded.progress,
        duration   = excluded.duration,
        completed  = CASE WHEN excluded.progress >= excluded.duration * 0.9 THEN 1 ELSE 0 END,
        watched_at = datetime('now')
    `).run(userId, tmdbId, mediaType, title, posterPath, progress, duration, 0),

  getAll: (userId) =>
    db.prepare("SELECT * FROM watch_progress WHERE user_id = ? ORDER BY watched_at DESC").all(userId),

  getOne: (userId, tmdbId, mediaType) =>
    db.prepare("SELECT * FROM watch_progress WHERE user_id = ? AND tmdb_id = ? AND media_type = ?").get(userId, tmdbId, mediaType),
};

module.exports = ProgressModel;
