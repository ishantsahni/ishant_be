const express = require("express");
const userModel = require("../../models/userModel");
const UserShoppingDetailsModel = require("../../models/userShoppingDetailsModel");

const router = express.Router();

router.get('/getProductDetails', async (req, res) => {
    try {
        const { name } = req.query;
        console.log("name ", name);
        const getUserDetails = await userModel.find({
            firstName: name
        });
        console.log("get user details data ", getUserDetails);
        const { email } = getUserDetails[0];
        console.log("email ", email);
        const getProductDetails = await UserShoppingDetailsModel.find({
            email
        });
        console.log("product details ", getProductDetails);
        res.status(200).json(getProductDetails);
    } catch (error) {
        console.log("Error while fetching product details info ", error);
        res.status(500).send(error);
    }

})

module.exports = router;