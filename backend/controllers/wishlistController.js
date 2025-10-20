const Wishlist = require('../models/Wishlist')
class wishlistController{
       async getAll(req, res, next) {
             try {
                 const wishlists = await Wishlist.find()
                 res.status(200).json(wishlists)
             } catch (err) {
                 res.status(500).json({ message: 'Error', error: err.message })
             }
         }
}
module.exports = new wishlistController()