const mongoose = require('mongoose')
const schema = mongoose.Schema
const WishlistSchema = new schema(
    {
      userId: {type: schema.Types.ObjectId, ref: 'User'},
      productId: {type: schema.Types.ObjectId, ref: 'Product'},
    },
    { timestamps: true }
)
module.exports = mongoose.model('Wishlist', WishlistSchema, 'wishlists')