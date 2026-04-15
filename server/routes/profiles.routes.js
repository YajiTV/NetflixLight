const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const profileController = require('../controllers/profileController');
const { asyncHandler } = require('../utils/async-handler');

router.use(requireAuth);

router.get('/', asyncHandler(profileController.getAll));
router.post('/', asyncHandler(profileController.create));
router.delete('/:id', asyncHandler(profileController.remove));

module.exports = router;
