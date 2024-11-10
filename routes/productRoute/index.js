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
      res.status(200).send(product);
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

module.exports = router;
