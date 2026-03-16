const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', asyncHandler(controller.getWatchlist));
router.post('/', asyncHandler(controller.addWatchlist));
router.delete('/:mediaId', asyncHandler(controller.removeWatchlist));
