const Router = require('express');
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware');
const checkRatingMiddleware = require('./../middleware/checkRatingMiddleware');
const ratingController = require('../controllers/ratingCotroller')

router.post('/', authMiddleware, checkRatingMiddleware, ratingController.addRating)
router.post('/check-rating', authMiddleware,  ratingController.checkRating);

module.exports = router;