const express = require("express");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    // Extract userId from the bearer token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodeToken.userId;

    const { orderDetails } = req.body;

    // Fetch user's shipping address from the User collection
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).send({ error: true, message: "User not found!" });
    }

    const shippingAddress = user.shippingAddress;

    // Initialize an array to store order items
    const orderItems = [];

    for (const item of orderDetails) {
      const { productId, quantity } = item;

      // Find the product by ID
      const product = await Product.findById(productId);

      // Check if product exists and has enough stock
      if (!product) {
        res.status(400).send({
          error: true,
          message: `Product with ID ${productId} not found.`,
        });
      }

      if (product.stock < quantity) {
        res.status(400).send({
          error: true,
          message: `Insufficient stock for product ${product.name}. Only ${product.quantity} left.`,
        });
      }

      // Deduct the qunatity from the product's stock and save it
      product.stock -= quantity;
      await product.save();

      // Add item to orderItems array
      orderItems.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    // Create a new order with default payment method and user's shipping address
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: "Online Transaction",
    });

    // Save the order to the database
    const savedOrder = await order.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: savedOrder._id },
    });

    // Respond with the created order
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
