const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Voucher = require("../models/Voucher");
const bcrypt = require("bcryptjs");

class AdminController {
  //Users Management
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createUser(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || 'user'
      });
      await newUser.save();
      const userResponse = newUser.toObject();
      delete userResponse.password;

      res.status(201).json(userResponse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.phone = req.body.phone || user.phone;

      if (req.body.address) {
        user.address = { ...user.address, ...req.body.address };
      }
      await user.save();
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(200).json(userResponse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Orders Management
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find({})
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price")
        .sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id)
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price img brand");
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const validStatuses = Order.schema.path('status').enumValues;
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status: "${status}"` });
      }
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status: status },
        { new: true }
      );
      if (!updatedOrder)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async deleteOrder(req, res) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Vouchers Management
  async getAllVouchers(req, res) {
    try {
      const vouchers = await Voucher.find({}).sort({ createdAt: -1 });
      res.status(200).json(vouchers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getVoucherById(req, res) {
    try {
      const voucher = await Voucher.findById(req.params.id);
      if (!voucher)
        return res.status(404).json({ message: "Voucher not found" });
      res.status(200).json(voucher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createVoucher(req, res) {
    try {
      const newVoucher = new Voucher(req.body);
      await newVoucher.save();
      res.status(201).json(newVoucher);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: "Voucher code must be unique." });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
  async updateVoucher(req, res) {
    try {
      if (req.body.code) {
        const existing = await Voucher.findOne({
          code: req.body.code,
          _id: { $ne: req.params.id }
        });
        if (existing) {
          return res.status(400).json({ message: "This voucher code is already in use." });
        }
      }
      const updatedVoucher = await Voucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedVoucher)
        return res.status(404).json({ message: "Voucher not found" });
      res.status(200).json(updatedVoucher);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
  async deleteVoucher(req, res) {
    try {
      const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);
      if (!deletedVoucher)
        return res.status(404).json({ message: "Voucher not found" });
      res.status(200).json({ message: "Voucher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Products Management
  async createProduct(req, res) {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({}).sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateProduct(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = new AdminController();
