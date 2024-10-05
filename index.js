const express = require('express');
const connectDB = require('./db');
const s3 = require('./awss3');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoute = require("./routes/productRoute");
require('dotenv').config();

mongoose.set('strictQuery', true);

const allowedOrigins = ['http:localhost:3001']

const app = express();

// Connect to MongoDB
const startServer = async () => {
    await connectDB();

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.S3_BUCKET_NAME,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
                cb(null, fileName); // Save file with a timestamp to avoid name collisions
            },
        }),
    });

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/user", userRoutes);

    app.use("/", productRoute);

    // Upload endpoint
    app.use("/upload", upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(400).send({
                message: "No file uploaded!"
            })
        }

        res.send({
            message: 'File uploaded successfully!',
            fileUrl: req.file.location
        })
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
}

startServer();
