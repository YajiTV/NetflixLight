const express = require('express');
const controller = require('../controllers/tmdb.controller');
const { asyncHandler } = require('../utils/async-handler');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/home', asyncHandler(controller.home));
router.get('/genre/:genreId', asyncHandler(controller.genre));
router.get('/search', requireAuth, asyncHandler(controller.search));
router.get('/detail/:mediaType/:id', requireAuth, asyncHandler(controller.detail));




module.exports = router;
