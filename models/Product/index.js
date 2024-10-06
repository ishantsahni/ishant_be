const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
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
    image: {
        type: String,
        required: true
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String },
            rating: { type: Number }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema, "products");