const Order = require("../models/Order");

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
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const {
        items,
        shippingMethod,
        shippingFee,
        address,
        paymentMethod,
        voucherCode,
        discount,
        totalPrice,
      } = req.body;

      if (
        !items ||
        items.length === 0 ||
        !shippingMethod ||
        !address ||
        !paymentMethod ||
        !totalPrice
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newOrder = new Order({
        userId,
        items,
        shippingMethod,
        shippingFee: shippingFee || 0,
        address,
        paymentMethod,
        voucherCode,
        discount: discount || 0,
        totalPrice,
      });

      await newOrder.save();

      res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating order", error: err.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      if (
        ![
          "pending",
          "processing",
          "shipped",
          "completed",
          "cancelled",
        ].includes(status)
      ) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      order.status = status;
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating order", error: err.message });
    }
  }
}

module.exports = new OrderController();
