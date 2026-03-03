const express = require('express');
const controller = require('../controllers/watchlist.controller');
const { asyncHandler } = require('../utils/async-handler');

const router = express.Router();
router.get('/', asyncHandler(controller.getWatchlist));
router.post('/', asyncHandler(controller.addWatchlist));
router.delete('/:mediaId', asyncHandler(controller.removeWatchlist));

module.exports = router;
