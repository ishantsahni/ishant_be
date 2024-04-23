const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {
        type: String,
        unique: true,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number
    }
})

module.exports = mongoose.model("ProductModel", productSchema);