const Cart = require("../models/Cart");
class CartController {
  async getAll(req, res, next) {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: "Error", error: err.message });
    }
  }

  async getByUserId(req, res) {
    try {
      const { userId } = req.params;
      if (req.user.id !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized access to this cart" });
      }

      const carts = await Cart.find({ userId })
        .populate("productId", "name price img brand")
        .sort({ createdAt: -1 });

      if (!carts || carts.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }

      res.status(200).json({
        message: "Get user orders successfully",
        count: carts.length,
        carts,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async addToCart(req, res) {
    try {
      const userId = req.user.id 
      const { productId, itemQuantity } = req.body

      if (!productId || !itemQuantity) {
        return res.status(400).json({ message: 'Missing productId or itemQuantity' })
      }
      const existingItem = await Cart.findOne({ userId, productId })

      if (existingItem) {
        existingItem.itemQuantity += itemQuantity
        await existingItem.save()

        return res.status(200).json({
          message: 'Item quantity updated successfully',
          cart: existingItem,
        })
      }
      const newCart = new Cart({ userId, productId, itemQuantity })
      await newCart.save()
      res.status(201).json({
        message: 'Item added to cart successfully',
        cart: newCart,
      })
    } catch (error) {
      console.error('Add to cart error:', error)
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }

   async updateCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { cartId } = req.params;
    const { itemQuantity } = req.body;

    if (!itemQuantity && itemQuantity !== 0) {
      return res.status(400).json({ message: "Missing itemQuantity" });
    }

    const cartItem = await Cart.findOne({ _id: cartId, userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    if (itemQuantity === 0) {
      await Cart.deleteOne({ _id: cartId });
      return res.status(200).json({
        message: "Item removed from cart successfully",
        removed: true,
      });
    }
    cartItem.itemQuantity = itemQuantity;
    await cartItem.save();
    res.status(200).json({
      message: "Cart item updated successfully",
      cart: cartItem,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


}
module.exports = new CartController();
