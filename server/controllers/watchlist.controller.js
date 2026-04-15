const service = require('../services/watchlist.service');

async function getWatchlist(req, res) {
  const items = service.getAll(req.session.userId);
  res.json(items);
}

async function addWatchlist(req, res) {
  const { tmdb_id, media_type, title, poster_path } = req.body;
  if (!tmdb_id || !media_type || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
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
