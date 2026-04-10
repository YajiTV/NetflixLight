const db = require('../config/db');

module.exports = {
  getByUser: (userId) =>
    db.prepare('SELECT * FROM profiles WHERE user_id = ? ORDER BY created_at ASC').all(userId),

  getById: (id, userId) =>
    db.prepare('SELECT * FROM profiles WHERE id = ? AND user_id = ?').get(id, userId),

  create: (userId, name, avatar) =>
    db.prepare('INSERT INTO profiles (user_id, name, avatar) VALUES (?, ?, ?)').run(userId, name, avatar),

  remove: (id, userId) =>
    db.prepare('DELETE FROM profiles WHERE id = ? AND user_id = ?').run(id, userId),

  countByUser: (userId) =>
    db.prepare('SELECT COUNT(*) as count FROM profiles WHERE user_id = ?').get(userId).count,
};
