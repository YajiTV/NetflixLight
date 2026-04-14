require('dotenv').config();

function getEnv() {
  if (!process.env.TMDB_API_KEY) throw new Error('Missing required env variable: TMDB_API_KEY');

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT),
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    DB_PATH: process.env.DB_PATH || './server/data/netflix.db',
  };
}

module.exports = { getEnv };
