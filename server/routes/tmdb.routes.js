const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/home', asyncHandler(controller.home));
router.get('/search', asyncHandler(controller.search));
router.get('/detail/:mediaType/:id', asyncHandler(controller.detail));
