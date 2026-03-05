const tmdbService = require('../services/tmdb.service');

function badRequest(message) {
  const err = new Error(message);
  err.status = 400;
  return err;
}

async function home(req, res) {
  const data = await tmdbService.getHomeFeed();
  res.json(data);
}

async function search(req, res) {
  const query = String(req.query.q || '').trim();
  if (!query) throw badRequest('Missing query parameter: q');

  const page = Number(req.query.page || 1);
  if (!Number.isInteger(page) || page < 1) {
    throw badRequest('Invalid query parameter: page must be a positive integer');
  }

  const data = await tmdbService.searchMulti(query, page);
  res.json(data);
}

async function detail(req, res) {
  const mediaType = String(req.params.mediaType || '').trim();
  const id = Number(req.params.id);

  if (!['movie', 'tv'].includes(mediaType)) {
    throw badRequest('Invalid mediaType. Expected "movie" or "tv"');
  }
  if (!Number.isInteger(id) || id <= 0) {
    throw badRequest('Invalid id. Expected a positive integer');
  }

  const data = await tmdbService.getDetail(mediaType, id);
  res.json(data);
}

module.exports = { home, search, detail };
