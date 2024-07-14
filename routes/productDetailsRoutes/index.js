const express = require("express");
const userModel = require("../../models/userModel");
const userShoppingDetailsModel = require("../../models/userShoppingDetailsModel");
const UserShoppingDetailsModel = require("../../models/userShoppingDetailsModel");

const router = express.Router();

router.get('/getProductDetails', async (req, res) => {
    try {
        const { name } = req.body;
        const getUserDetails = await userModel.find({
            firstName: name
        });
        console.log("get user details data ", getUserDetails);
        const { email } = getUserDetails;
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