const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder, updateOrderDetails, clearAllOrders } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.delete("/clear/all", protect, admin, clearAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.put("/:id/details", protect, admin, updateOrderDetails);

router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;