require('dotenv').config();

function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT || 3000),
    TMDB_API_KEY: process.env.TMDB_API_KEY || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    DB_PATH: process.env.DB_PATH || './server/data/netflix.db',
  };
}

module.exports = { getEnv };
