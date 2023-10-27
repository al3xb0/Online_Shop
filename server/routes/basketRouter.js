const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.put('/delete' , basketController.deleteBasket)

module.exports = router