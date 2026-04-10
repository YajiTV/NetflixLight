const ProfileModel = require('../models/profileModel');

module.exports = {

  getAll(req, res) {
    const profiles = ProfileModel.getByUser(req.session.userId);
    res.json(profiles);
  },

  create(req, res) {
    const { name, avatar } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Profile name is required' });
    }
    const count = ProfileModel.countByUser(req.session.userId);
    if (count >= 5) {
      return res.status(400).json({ error: 'Maximum 5 profiles per account' });
    }
    const result = ProfileModel.create(req.session.userId, name.trim(), avatar || null);
    res.status(201).json({ id: result.lastInsertRowid, name: name.trim(), avatar: avatar || null });
  },

  remove(req, res) {
    ProfileModel.remove(req.params.id, req.session.userId);
    res.json({ message: 'Profile deleted' });
  },

};
