const { requireAuth } = require('../middleware/auth');

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));

router.post('/logout', requireAuth, asyncHandler(controller.logout));
router.get('/me', requireAuth, asyncHandler(controller.me));
