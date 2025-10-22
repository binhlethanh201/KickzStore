const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyToken = require('../middlewares/auth')

router.get('/', userController.getAll)
router.get('/profile', verifyToken,userController.getProfile)

module.exports = router