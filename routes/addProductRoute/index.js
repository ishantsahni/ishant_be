const express = require("express");
const productModel = require("../../models/productModel");

const router = express.Router();

router.post("/postProductData", async (req, res) => {
    try {
        const { productName, description, price, category, brand, stock, images } = req.body;
        const productData = {
            productName: productName,
            description: description,
            price: price,
            category: category,
            brand: brand,
            stock: stock,
            images: images
        }
        const newProductData = new productModel(productModel);
        const saveProductData = await newProductData.save();
        if (saveProductData) {
            res.status(200).send("Product Data saved successfully!");
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
});

module.exports = router;