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
router.post("/postUserData", async (req, res) => {
    try {
        const { firstName, lastName, age, email } = req.body;
        const userData = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email
        }
        const newUserData = new userModel(userData);
        const saveUserData = await new userModel(newUserData).save();
        if (saveUserData) {
            res.status(200).send("User data saved successfully!")
        }
        res.end();
    } catch (error) {
        console.log("Error saving user data !!", error.message);
        res.status(500).send("Unable to save data");
    }
})

module.exports = router;