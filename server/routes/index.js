const express = require('express');
const authRoutes = require('./auth.routes');
const tmdbRoutes = require('./tmdb.routes');
const watchlistRoutes = require('./watchlist.routes');
const profilesRoutes = require('./profiles.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/tmdb', tmdbRoutes);
router.use('/watchlist', watchlistRoutes);
router.use('/profiles', profilesRoutes);

module.exports = router;
