const router = require('express').Router();
const { requireAuth } = require('../middleware/auth');
const profileController = require('../controllers/profileController');

router.use(requireAuth);

router.get('/', profileController.getAll);
router.post('/', profileController.create);
router.delete('/:id', profileController.remove);

module.exports = router;
