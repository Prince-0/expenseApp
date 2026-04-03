const path = require("path");
const axios = require('axios');
const Payment = require("../models/paymentModel");
const User = require("../models/usersmodel");
const {
  createOrder,
  getPaymentStatus
} = require("../services/cashfreeServices");

// ✅ Load payment page
exports.getPaymentPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/payment.html"));
};

// ✅ Step 1: Create Order
exports.processPayment = async (req, res) => {
  try {
    console.log("👉 Payment API hit");
    console.log("USER:", req.user); // 🔍 debug

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findByPk(req.user.id); // ✅ fetch full user

    const orderId = "ORDER-" + Date.now();

    const paymentSessionId = await createOrder(
      orderId,
      100,
      "INR",
      user.id,
      "9876543210",
      user.email   // ✅ always valid now
    );

    await Payment.create({
      orderId,
      paymentSessionId,
      orderAmount: 100,
      orderCurrency: "INR",
      paymentStatus: "PENDING",
      userId: user.id
    });

    res.json({ paymentSessionId, orderId });

  } catch (error) {
    console.error("❌ Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Step 2: Verify Payment
exports.getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const status = await getPaymentStatus(orderId);

    const payment = await Payment.findOne({
      where: { orderId }
    });

    if (!payment) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status
    payment.paymentStatus = status;
    await payment.save();

    // 🎯 Upgrade user
    if (status === "PAID") {
      const user = await User.findByPk(payment.userId);
      user.isPremium = true;
      await user.save();
    }

    res.json({ status });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying payment" });
  }
};