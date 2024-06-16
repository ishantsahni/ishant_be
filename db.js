require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ishantsahni888:Aventador#1@ecommercecluster.i7cswz3.mongodb.net/?retryWrites=true&w=majority&appName=eCommerceCluster';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
