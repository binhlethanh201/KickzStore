const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/auth");
const checkAdmin = require("../middlewares/admin");

router.use(verifyToken, checkAdmin);
//Users Management
router.get("/users", AdminController.getAllUsers);
router.get("/users/:id", AdminController.getUserById);
router.post("/users", AdminController.createUser);
router.put("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.deleteUser);
//Orders Management
router.get("/orders", AdminController.getAllOrders);
router.get("/orders/:id", AdminController.getOrderById);
router.put("/orders/:id/status", AdminController.updateOrderStatus);
router.delete("/orders/:id", AdminController.deleteOrder);
//Vouchers Management
router.get("/vouchers", AdminController.getAllVouchers);
router.get("/vouchers/:id", AdminController.getVoucherById);
router.post("/vouchers", AdminController.createVoucher);
router.put("/vouchers/:id", AdminController.updateVoucher);
router.delete("/vouchers/:id", AdminController.deleteVoucher);
//Products Management
router.get("/products", AdminController.getAllProducts);
router.get("/products/:id", AdminController.getProductById);
router.post("/products", AdminController.createProduct);
router.put("/products/:id", AdminController.updateProduct);
router.delete("/products/:id", AdminController.deleteProduct);

module.exports = router;
