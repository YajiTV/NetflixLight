const ProfileModel = require('../models/profileModel');

module.exports = {

  getAll(req, res) {
    const profiles = ProfileModel.getByUser(req.session.userId);
    res.json(profiles);
  },

  create(req, res) {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Profile name is required' });
    }
    const count = ProfileModel.countByUser(req.session.userId);
    if (count >= 5) {
      return res.status(400).json({ error: 'Maximum 5 profiles per account' });
    }
    const result = ProfileModel.create(req.session.userId, name.trim());
    res.status(201).json({ id: result.lastInsertRowid, name: name.trim() });
  },

  remove(req, res) {
    ProfileModel.remove(req.params.id, req.session.userId);
    res.json({ message: 'Profile deleted' });
  },

};
