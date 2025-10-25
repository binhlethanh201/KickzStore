const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/auth");

router.get("/:userId", verifyToken, orderController.getByUser);
router.post("/", verifyToken, orderController.createOrder);
router.get("/", verifyToken, orderController.getAll);
router.put("/:orderId/status", verifyToken, orderController.updateStatus);

module.exports = router;
