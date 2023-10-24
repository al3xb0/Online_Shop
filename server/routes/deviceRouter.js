const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), deviceController.create)
router.put('/delete/:id', checkRole('ADMIN'), deviceController.delete)
router.put('/edit', checkRole('ADMIN'), deviceController.editDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router