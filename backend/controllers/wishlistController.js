const Wishlist = require('../models/Wishlist')

class WishlistController {
  async getAll(req, res) {
    try {
      const wishlists = await Wishlist.find()
        .populate('userId', 'name email')
        .populate('productId', 'name price img brand')
      res.status(200).json(wishlists)
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message })
    }
  }

  async getByUser(req, res) {
    try {
      const { userId } = req.params
      if (req.user.id !== userId) {
        return res.status(403).json({ message: 'Unauthorized access' })
      }

      const wishlist = await Wishlist.find({ userId })
        .populate('productId', 'name price img brand')
        .sort({ createdAt: -1 })

      res.status(200).json({
        message: 'Get wishlist successfully',
        count: wishlist.length,
        wishlist,
      })
    } catch (err) {
      res.status(500).json({ message: 'Error fetching wishlist', error: err.message })
    }
  }

  async addToWishlist(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.body

      if (!productId) {
        return res.status(400).json({ message: 'Missing productId' })
      }

      const existing = await Wishlist.findOne({ userId, productId })
      if (existing) {
        return res.status(200).json({ message: 'Product already in wishlist', wishlist: existing })
      }

      const newItem = new Wishlist({ userId, productId })
      await newItem.save()

      res.status(201).json({
        message: 'Added to wishlist successfully',
        wishlist: newItem,
      })
    } catch (err) {
      res.status(500).json({ message: 'Error adding to wishlist', error: err.message })
    }
  }

  async removeFromWishlist(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.params

      const deleted = await Wishlist.findOneAndDelete({ userId, productId })
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found in wishlist' })
      }

      res.status(200).json({ message: 'Removed from wishlist successfully' })
    } catch (err) {
      res.status(500).json({ message: 'Error removing from wishlist', error: err.message })
    }
  }
}

module.exports = new WishlistController()
