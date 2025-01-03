const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { sendSignUpEmail } = require("../../utils/emailService");

const router = express.Router();

// User Registration(Sing-up)
router.post("/", async (req, res) => {
  const { name, email, password, address, city, postalCode, country } =
    req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
    });

    // Save user
    await user.save();

    // Send the sign up email
    sendSignUpEmail(user.email, user.name);

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully!",
      accessToken,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
