const express = require('express');
const controller = require('../controllers/auth.controller');
const { asyncHandler } = require('../utils/async-handler');

const router = express.Router();
router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/logout', asyncHandler(controller.logout));
router.get('/me', asyncHandler(controller.me));

module.exports = router;
