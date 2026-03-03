const express = require('express');
const controller = require('../controllers/tmdb.controller');
const { asyncHandler } = require('../utils/async-handler');

const router = express.Router();
router.get('/home', asyncHandler(controller.home));
router.get('/search', asyncHandler(controller.search));
router.get('/detail/:mediaType/:id', asyncHandler(controller.detail));

module.exports = router;
