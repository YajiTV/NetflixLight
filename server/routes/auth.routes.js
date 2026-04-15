const express = require('express');
const controller = require('../controllers/auth.controller');
const { asyncHandler } = require('../utils/async-handler');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/logout', requireAuth, asyncHandler(controller.logout));
router.get('/me', requireAuth, asyncHandler(controller.me));

module.exports = router;
