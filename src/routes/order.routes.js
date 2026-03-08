const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getOrders,
  getOrderById,
  //   updateOrder,
  //   deleteOrder
} = require("../controllers/order.controller");

// Public
router.get("/", getOrders);
router.get("/:id", getOrderById);

// Admin
// router.post("/", auth, authorize("admin"), createOrder);
// router.put("/:id", auth, authorize("admin"), updateOrder);
// router.delete("/:id", auth, authorize("admin"), deleteOrder);

module.exports = router;
