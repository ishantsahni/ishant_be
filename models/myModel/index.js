const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('MyModel', mySchema);