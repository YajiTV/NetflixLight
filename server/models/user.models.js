const db = require("../config/db");

const UserModel = {
  findByEmail: (email) =>
    db.prepare("SELECT * FROM users WHERE email = ?").get(email),

  findById: (id) =>
    db.prepare("SELECT id, username, email, theme, created_at FROM users WHERE id = ?").get(id),
  findByUsername :(username) =>
    db.prepare("SELECT * FROM users WHERE username = ?").get(username),

  create: ({ username, email, password }) =>
    db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)").run(username, email, password),

  updateTheme: (id, theme) =>
    db.prepare("UPDATE users SET theme = ?, updated_at = datetime('now') WHERE id = ?").run(theme, id),
};

module.exports = UserModel;
