const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../../models/User");

const router = express.Router();

// User signin
router.post('/', async (req, res) => {

    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: 'User does not exist!' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password!' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }

})

module.exports = router;