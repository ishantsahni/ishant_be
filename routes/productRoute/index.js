const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.post("/addProduct", async (req, res) => {
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
        const newProductData = new Product(productData);
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

router.get("/getProducts", async (req, res) => {
    try {
        const allProducts = await Product.find();
        if (allProducts) {
            res.status(200).send(allProducts);
        }
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
})

router.get("/getProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById({
            _id: productId
        });

        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send("Product not found!");
        }

    } catch (error) {
        res.status(500).send({
            error: true,
            message: error.message
        })
    }
})

module.exports = router;