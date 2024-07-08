const express = require("express");
const userModel = require("../../models/userModel");

const router = express.Router();

// GET end point to fetch all user data
router.get("/getUserData", async (req, res) => {
    try {
        const userData = await userModel.find();
        res.json(userData);
    } catch (error) {
        console.error("Error fetching user data ", error);
        res.status(500).send("Error fetching user data!!");
    }
})

// POST end point to save user data
