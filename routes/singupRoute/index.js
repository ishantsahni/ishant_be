const express = require('express');
const bycrypt = require('bycryptjs');
const User = require("../../models/User");

const router = express.Router();

// User Registration(Sing-up)
router.post("/signup", async (req, res) => {
    const { name, email, password, address, city, postalCode, country } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists!' });
        }

        // Hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            shippingAddress: {
                address,
                city,
                postalCode,
                country
            }
        })

        // Save user
        await user.save();



    } catch (error) {

    }

})

module.exports = router;