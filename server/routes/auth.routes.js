const express = require('express');
const controller = require('../controllers/auth.controller');
const { asyncHandler } = require('../utils/async-handler');

const router = express.Router();
router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.get('/me', asyncHandler(controller.me));

module.exports = router;
