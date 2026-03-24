const { getEnv } = require('../config/env');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_LANGUAGE = 'fr-FR';
const REQUEST_TIMEOUT_MS = 10000;

function toError(status, message, details) {
  const err = new Error(message);
  err.status = status;
  if (details !== undefined) err.details = details;
  return err;
}

async function tmdbFetch(path, query = {}) {
  const env = getEnv();

  if (!env.TMDB_API_KEY) {
    throw toError(500, 'TMDB_API_KEY is missing in environment variables');
  }

  const params = new URLSearchParams({
    api_key: env.TMDB_API_KEY,
    language: DEFAULT_LANGUAGE,
    ...query,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${TMDB_BASE_URL}${path}?${params.toString()}`, {
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
  const [trending, nowPlaying, popularTv, topMovies, topTv] = await Promise.all([
    tmdbFetch('/trending/all/week'),
    tmdbFetch('/movie/now_playing', { page: 1 }),
    tmdbFetch('/tv/popular', { page: 1 }),
    tmdbFetch('/movie/top_rated', { page: 1 }),
    tmdbFetch('/tv/top_rated', { page: 1 }),
  ]);

  // Mélange films + séries, triés par note décroissante
  const topRated = [
    ...topMovies.results.map(m => ({ ...m, media_type: 'movie' })),
    ...topTv.results.map(s => ({ ...s, media_type: 'tv' })),
  ].sort((a, b) => b.vote_average - a.vote_average).slice(0, 20);

  return {
    trending,
    nowPlaying,
    popularTv,
    topRated,
  };
}


async function searchMulti(query, page = 1) {
  return tmdbFetch('/search/multi', {
    query,
    include_adult: 'false',
    page: String(page),
  });
}

async function getDetail(mediaType, id) {
  return tmdbFetch(`/${mediaType}/${id}`, {
    append_to_response: 'videos,credits,similar',
  });
}

module.exports = {
  getHomeFeed,
  searchMulti,
  getDetail,
};
