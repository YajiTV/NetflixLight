const service = require('../services/watchlist.service');

async function getWatchlist(req, res) {
  const items = service.getAll(req.session.userId);
  res.json(items);
}

async function addWatchlist(req, res) {
  service.add(req.session.userId, req.body);
  res.status(201).json({ ok: true });
}

async function removeWatchlist(req, res) {
  const { mediaId } = req.params;
  const { type } = req.query;
  service.remove(req.session.userId, mediaId, type);
  res.json({ ok: true });
}

module.exports = { getWatchlist, addWatchlist, removeWatchlist };
