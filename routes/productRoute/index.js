const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, image } =
      req.body;
    const productData = {
      name: name,
      description: description,
      price: price,
      category: category,
      brand: brand,
      stock: stock,
      image: image,
    };
    const newProductData = new Product(productData);
    const saveProductData = await newProductData.save();
    if (saveProductData) {
      res.status(200).send("Product Data saved successfully!");
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

router.post("/getProducts", async (req, res) => {
  try {
    // Extract filter from the request body
    const { category, price, search } = req.body;

    // Build the query object dynamically based on provided filters
    let query = {};

    if (category) {
      query.category = category;
    }

    if (price) {
      query.price = { $lte: price }; // Product with price <= specified price
    }

    if (search) {
      // query.description = { $regex: search, $options: "i" }; // Case-insensitive search
      query.$or = [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const allProducts = await Product.find(query);

    if (allProducts) {
      const modifiedProducts = allProducts.map((product) => {
        const productObj = product.toObject();
        productObj.productId = productObj._id;
        delete productObj._id;
        return productObj;
      });
      res.status(200).send(modifiedProducts);
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById({
      _id: productId,
    });

    if (product) {
      const modifiedProduct = product.toObject();
      modifiedProduct.productId = modifiedProduct._id;
      delete modifiedProduct._id;
      res.status(200).send(modifiedProduct);
    } else {
      res.status(404).send("Product not found!");
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

router.post("/getProductsById", (req, res) => {
  try {
    // Extract the array of product IDs from the array
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      res.status(400).send({
        error: true,
        message: "Invalid or empty productIds array",
      });
    }

    // Find products whose _id matches with any of the provided productIds
    const products = Product.find({
      _id: { $in: productIds },
    });

    if (products.length > 0) {
      const modifiedProducts = products.map((product) => {
        const productObj = product.toObject();
        productObj.productId = productObj._id;
        delete productObj._id;
        return productObj;
      });
      res.status(200).send(modifiedProducts);
    } else {
      res.status(400).send("No products found for the given IDs");
    }
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
