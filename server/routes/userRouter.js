const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/delete/:id', checkRole('ADMIN'), userController.delete)
router.put('/edit', checkRole('ADMIN'), userController.editUser)
router.get('/auth', authMiddleware, userController.check)
router.get('/admin', checkRole('ADMIN'), userController.check)
router.get('/', checkRole('ADMIN'), userController.getAll)

module.exports = router