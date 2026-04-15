const { getEnv } = require('../config/env');
const { toError } = require('../utils/errors');

const DEFAULT_LANGUAGE = 'en-EN';
const REQUEST_TIMEOUT_MS = 10000;

async function tmdbFetch(path, query = {}) {
  const env = getEnv();

  if (!env.TMDB_API_KEY) {
    throw toError(500, 'TMDB_API_KEY required');
  }

  const params = new URLSearchParams({
    api_key: env.TMDB_API_KEY,
    language: DEFAULT_LANGUAGE,
    ...query,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${env.TMDB_BASE_URL}${path}?${params.toString()}`, {
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw toError(
        response.status,
        data.status_message || 'TMDB request failed',
        data
      );
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw toError(504, 'TMDB request timeout');
    }
    if (error.status) throw error;
    throw toError(502, 'Unable to reach TMDB API');
  } finally {
    clearTimeout(timeout);
  }
}

async function getHomeFeed() {
  const [trending, popularTv, topMovies, topTv] = await Promise.all([
    tmdbFetch('/trending/all/week'),
    tmdbFetch('/tv/popular', { page: 1 }),
    tmdbFetch('/movie/top_rated', { page: 1 }),
    tmdbFetch('/tv/top_rated', { page: 1 }),
  ]);

  // Mix movies + series, sorted by descending rating
  const topRated = [
    ...topMovies.results.map(m => ({ ...m, media_type: 'movie' })),
    ...topTv.results.map(s => ({ ...s, media_type: 'tv' })),
  ].sort((a, b) => b.vote_average - a.vote_average).slice(0, 20);

  return {
    trending,
    popularTv,
    topRated,
  };
}


async function searchMulti(query, page = 1) {
  return tmdbFetch('/search/multi', {
    query,
    page: String(page),
  });
}

async function getByGenre(genreId) {
  const data = await tmdbFetch('/discover/movie', {
    with_genres: String(genreId),
    sort_by: 'popularity.desc',
    page: '1'
  });
  return data.results.map(m => ({...m, media_type: 'movie'}));
}

async function getDetail(mediaType, id) {
  return tmdbFetch(`/${mediaType}/${id}`, {
    append_to_response: 'videos,credits,similar',
  });
}

module.exports = {
  getHomeFeed,
  searchMulti,
  getByGenre,
  getDetail,
};
