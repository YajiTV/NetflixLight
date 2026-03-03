async function getWatchlist(req, res) {
  res.status(501).json({ error: 'GET /api/watchlist not implemented' });
}

async function addWatchlist(req, res) {
  res.status(501).json({ error: 'POST /api/watchlist not implemented' });
}

async function removeWatchlist(req, res) {
  res.status(501).json({ error: 'DELETE /api/watchlist/:mediaId not implemented' });
}

module.exports = { getWatchlist, addWatchlist, removeWatchlist };
