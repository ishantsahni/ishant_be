const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://ishantsahni888:8fpSeWHuqC2a0ZrY@ishantcluster.c0qsown.mongodb.net/?retryWrites=true&w=majority&appName=ishantCluster`, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;