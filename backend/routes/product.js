const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
router.get('/search', productController.search)
router.get('/:id', productController.getById)
router.get('/', productController.getAll)

module.exports = router