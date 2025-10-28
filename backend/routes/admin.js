const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const verifyToken = require("../middlewares/auth");
const checkAdmin = require("../middlewares/admin");

router.use(verifyToken, checkAdmin);

router.get("/users", AdminController.getAllUsers);
router.get("/users/:id", AdminController.getUserById);
router.post("/users", AdminController.createUser);
router.put("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.deleteUser);

module.exports = router;
