require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ishantsahni888:P5nPAqPC7rfhVMeE@ecommercecluster.asix2.mongodb.net/?retryWrites=true&w=majority&appName=eCommerceCluster';
// const mongoURI = 'mongodb+srv://ishantsahni888:Aventador%1@ishantcluster.lxyvhdh.mongodb.net/?retryWrites=true&w=majority&appName=ishantCluster'

const connectDB = async () => {
    console.log("came here");
    try {
        console.log("came here 2");
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("came here")
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
