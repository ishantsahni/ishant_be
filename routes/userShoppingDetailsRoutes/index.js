const express = require("express");
const UserShoppingDetailsModel = require("../../models/userShoppingDetailsModel");
const router = express.Router();


router.post("/postUserShoppingDetails", async (req, res) => {
    try {
        const { product, price, quantity, email } = req.body;
        const userShoppingDetailsProduct = {
            product: product,
            price: price,
            quantity: quantity,
            email: email
        }
        const newUserShoppingDetailsProduct = new UserShoppingDetailsModel(userShoppingDetailsProduct);
        const saveNewUserShoppingDetailsProduct = newUserShoppingDetailsProduct.save();
        if (saveNewUserShoppingDetailsProduct) {
            res.status(200).send("User shopping details information added!");
        } else {
            res.status(500).send("Error in saving information!");
        }
    } catch (error) {
        console.log("Error in saving information!!");
    }
})

module.exports = router;