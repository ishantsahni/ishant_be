const express = require("express");
const Product = require("../../models/Product");
const User = require("../../models/User");
const Review = require("../../models/Review");

const router = express.Router();

router.post("/addReview", async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Create new review
    const review = new Review({
      rating,
      comment,
      user: userId,
      product: productId,
    });
    await review.save();

    // Upate product and user with review reference
    product.reviews.push(review._id);
    user.reviews.push(review._id);

    await product.save();
    await user.save();

    return res
      .status(201)
      .json({ message: "Review added successfully", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
});

router.post("/getReviews", async (req, res) => {
  const { productId } = req.body;

  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name email"
    );
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product!" });
    }
    return res.status(200).json({ reviews });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch reviews", error: error.message });
  }
});

module.exports = router;
