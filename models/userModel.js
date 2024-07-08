const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    }
})

const Users = mongoose.model('Users', userSchema, 'users');

module.exports = Users;
