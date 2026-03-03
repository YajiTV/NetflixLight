async function home(req, res) {
  res.status(501).json({ error: 'GET /api/tmdb/home not implemented' });
}

async function search(req, res) {
  res.status(501).json({ error: 'GET /api/tmdb/search not implemented' });
}

async function detail(req, res) {
  res.status(501).json({ error: 'GET /api/tmdb/detail/:mediaType/:id not implemented' });
}

module.exports = { home, search, detail };
