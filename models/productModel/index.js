const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("ProductModel", productSchema, products);