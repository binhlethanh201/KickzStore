const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')
const verifyToken = require('../middlewares/auth')

// ✅ Lấy tất cả wishlist (admin)
router.get('/', wishlistController.getAll)

// ✅ Lấy wishlist theo user
router.get('/user/:userId', verifyToken, wishlistController.getByUser)

// ✅ Thêm sản phẩm vào wishlist
router.post('/', verifyToken, wishlistController.addToWishlist)

// ✅ Xóa sản phẩm khỏi wishlist
router.delete('/:productId', verifyToken, wishlistController.removeFromWishlist)

module.exports = router
