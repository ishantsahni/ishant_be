const express = require("express");
const router = express.Router();
const razorpayInstance = require("../../config/razorpay");

router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency: currency || "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log("Error creating order: ", error);
    res.status(500).send({ error: "Failed to create order" });
  }
});

module.exports = router;
