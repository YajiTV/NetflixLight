const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// ─── Ensure data directory exists ───────────────────────────────────────────
const dataDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// ─── Open / create the database ─────────────────────────────────────────────
const db = new Database(process.env.DB_PATH || path.join(dataDir, "netflix.db"));

// ─── Performance settings ────────────────────────────────────────────────────
db.pragma("journal_mode = WAL");   // meilleures perfs en lecture/écriture simultanée
db.pragma("foreign_keys = ON");    // active les contraintes FK

// ─── Schema ──────────────────────────────────────────────────────────────────
db.exec(`

  -- ── USERS ──────────────────────────────────────────────────────────────────
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT    NOT NULL UNIQUE,
    email       TEXT    NOT NULL UNIQUE,
    password    TEXT    NOT NULL,               -- bcrypt hash
    avatar      TEXT    DEFAULT NULL,           -- URL ou emoji
    theme       TEXT    DEFAULT 'dark',         -- 'dark' | 'light'
    role        TEXT    DEFAULT 'user',         -- 'user' | 'admin'
                CHECK(role IN ('user', 'admin')),
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );

  -- ── WATCHLIST ───────────────────────────────────────────────────────────────
  CREATE TABLE IF NOT EXISTS watchlist (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    tmdb_id      INTEGER NOT NULL,              -- ID TMDB du film/série
    media_type   TEXT    NOT NULL               -- 'movie' | 'tv'
                 CHECK(media_type IN ('movie', 'tv')),
    title        TEXT    NOT NULL,
    poster_path  TEXT    DEFAULT NULL,
    added_at     TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, tmdb_id, media_type)        -- pas de doublon par user
  );

  -- ── WATCH PROGRESS ──────────────────────────────────────────────────────────
  CREATE TABLE IF NOT EXISTS watch_progress (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    tmdb_id      INTEGER NOT NULL,
    media_type   TEXT    NOT NULL
                 CHECK(media_type IN ('movie', 'tv')),
    title        TEXT    NOT NULL,
    poster_path  TEXT    DEFAULT NULL,
    progress     REAL    DEFAULT 0,             -- secondes écoulées
    duration     REAL    DEFAULT 0,             -- durée totale en secondes
    completed    INTEGER DEFAULT 0,             -- 0 | 1 (booléen SQLite)
    watched_at   TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, tmdb_id, media_type)        -- une seule progression par contenu
  );

`);

console.log("SQLite connecté — base prête");

module.exports = db;
