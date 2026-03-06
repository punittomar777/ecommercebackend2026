const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth.middleware");

router.post("/create", auth, paymentController.createPayment);

router.post("/webhook",
  express.raw({ type: "application/json" }),
  paymentController.webhook
);

module.exports = router;