const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(process.env.DB_PATH || path.join(dataDir, "netflix.db"));

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`

  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT    NOT NULL UNIQUE,
    email       TEXT    NOT NULL UNIQUE,
    password    TEXT    NOT NULL,
    avatar      TEXT    DEFAULT NULL,
    theme       TEXT    DEFAULT 'dark' CHECK(theme IN ('dark', 'light')),
    role        TEXT    DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS watchlist (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    tmdb_id      INTEGER NOT NULL,
    media_type   TEXT    NOT NULL CHECK(media_type IN ('movie', 'tv')),
    title        TEXT    NOT NULL,
    poster_path  TEXT    DEFAULT NULL,
    added_at     TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, tmdb_id, media_type)
  );

  CREATE TABLE IF NOT EXISTS watch_progress (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    tmdb_id      INTEGER NOT NULL,
    media_type   TEXT    NOT NULL CHECK(media_type IN ('movie', 'tv')),
    title        TEXT    NOT NULL,
    poster_path  TEXT    DEFAULT NULL,
    progress     REAL    DEFAULT 0,
    duration     REAL    DEFAULT 0,
    completed    INTEGER DEFAULT 0,
    watched_at   TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, tmdb_id, media_type)
  );

  CREATE TABLE IF NOT EXISTS ratings (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    tmdb_id      INTEGER NOT NULL,
    media_type   TEXT    NOT NULL CHECK(media_type IN ('movie', 'tv')),
    rating       INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
    rated_at     TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, tmdb_id, media_type)
  );

`);

console.log("SQLite connecté — base prête");

module.exports = db;
