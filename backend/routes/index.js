const express = require('express')
const router = express.Router()
const cartRouter = require('./cart')
const productRouter = require('./product')
const userRouter = require('./user')
const wishListRouter = require('./wishlist')
const authRouter = require('./auth')   

router.use('/carts', cartRouter)
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/wishlists', wishListRouter)
router.use('/auth', authRouter)     

module.exports = router
