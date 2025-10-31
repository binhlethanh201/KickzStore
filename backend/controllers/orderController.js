const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Voucher = require("../models/Voucher");

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await Order.find()
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price img brand");
      res.status(200).json(orders);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching orders", error: err.message });
    }
  }

  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      if (req.user.id !== userId) {
        return res.status(403).json({ message: "Unauthorized access" });
      }
      const orders = await Order.find({ userId })
        .populate("items.productId", "name price img brand")
        .sort({ createdAt: -1 });

      res.status(200).json({
        message: "Get orders successfully",
        count: orders.length,
        orders,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching orders", error: err.message });
    }
  }

  async getOrderDetail(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const order = await Order.findOne({ _id: orderId, userId: userId })
        .populate("items.productId", "name price img brand");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Get order detail successfully", order });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid order ID format" });
      }
      res.status(500).json({ message: "Error fetching order detail", error: err.message });
    }
  }

  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const {
        selectedItems,
        shippingMethod,
        address,
        paymentMethod,
        voucherCode,
      } = req.body;

      if (!selectedItems || selectedItems.length === 0) {
        return res.status(400).json({ message: "No items selected for checkout" });
      }
      const cart = await Cart.findOne({ userId }).populate("items.productId");
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      const orderItems = [];
      let totalPrice = 0;

      for (const item of selectedItems) {
        const found = cart.items.find(
          (ci) =>
            ci.productId._id.toString() === item.productId &&
            ci.size === item.size &&
            ci.color === item.color
        );
        if (found) {
          const price = found.productId.price * found.quantity;
          totalPrice += price;
          orderItems.push({
            productId: found.productId._id,
            quantity: found.quantity,
            price: found.productId.price,
          });
        }
      }
      let discount = 0;
      if (voucherCode) {
        const voucher = await Voucher.findOne({
          code: voucherCode,
          isActive: true,
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        });

        if (!voucher) {
          return res.status(400).json({ message: "Invalid or expired voucher" });
        }

        if (totalPrice < voucher.minOrderValue) {
          return res
            .status(400)
            .json({ message: `Order must be at least $${voucher.minOrderValue} to use this voucher` });
        }

        discount =
          voucher.discountType === "percent"
            ? (totalPrice * voucher.discountValue) / 100
            : voucher.discountValue;

        if (discount > totalPrice) discount = totalPrice;
      }
      const shippingFee = shippingMethod === "express" ? 5 : 0;
      const finalPrice = totalPrice - discount + shippingFee;
      const newOrder = new Order({
        userId,
        items: orderItems,
        shippingMethod,
        shippingFee,
        address,
        paymentMethod,
        voucherCode,
        discount,
        totalPrice: finalPrice,
      });

      await newOrder.save();
      cart.items = cart.items.filter(
        (ci) =>
          !selectedItems.some(
            (si) =>
              si.productId === ci.productId.toString() &&
              si.size === ci.size &&
              si.color === ci.color
          )
      );
      await cart.save();
      res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
      });
    } catch (err) {
      console.error("Create order error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      if (!order)
        return res.status(404).json({ message: "Order not found" });

      res.status(200).json({ message: "Order status updated", order });
    } catch (err) {
      res.status(500).json({ message: "Error updating order", error: err.message });
    }
  }

  async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id: orderId,
          userId: userId,
          status: "pending"
        },
        {
          status: "cancelled"
        },
        {
          new: true
        }
      );
      if (!updatedOrder) {
        const order = await Order.findOne({ _id: orderId, userId: userId });
        if (!order) {
          return res.status(404).json({ message: "Order not found or you are not authorized" });
        }
        return res.status(400).json({
          message: `Order cannot be cancelled. Its current status is "${order.status}".`
        });
      }
      res.status(200).json({ message: "Order successfully cancelled", order: updatedOrder });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid order ID format" });
      }
      res.status(500).json({ message: "Server error while cancelling order", error: err.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
      const deletedOrder = await Order.findOneAndDelete({
        _id: orderId,
        userId: userId,
        status: "cancelled"
      });
      if (!deletedOrder) {
        const order = await Order.findOne({ _id: orderId, userId: userId });
        if (!order) {
          return res.status(404).json({ message: "Order not found or you are not authorized" });
        }
        return res.status(400).json({
          message: `Order cannot be deleted. Its status is "${order.status}", not "cancelled".`
        });
      }
      res.status(200).json({ message: "Order successfully deleted" });
    } catch (err) {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid order ID format" });
      }
      res.status(500).json({ message: "Server error while deleting order", error: err.message });
    }
  }

}

module.exports = new OrderController();

