const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userShoppingDetailsSchema = new schema({
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const UserShoppingDetailsModel = mongoose.model('UserShoppingDetailsModel', userShoppingDetailsSchema, 'userShoppingDetails');

module.exports = UserShoppingDetailsModel;