const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const userModel = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const userShoppingDetailsRoute = require('./routes/userShoppingDetailsRoutes');
const UserShoppingDetailsModel = require('./models/userShoppingDetailsModel');
require('dotenv').config();

const allowedOrigins = ['http:localhost:3001']

const app = express();

// Connect to MongoDB
connectDB();

// Create the uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the directory is created recursively
}

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Data coming from backend data!');
})

app.get("/firstApi", (req, res) => {
    res.send(["Mango", "Apple", "Orange", "Banana", "Grapes"]);
})

app.use("/user", userRoutes);

app.use("/", userShoppingDetailsRoute);

// Upload endpoint
app.use("/upload", upload.single('file'), (req, res) => {
    res.send({
        message: 'File uploaded successfully!',
        file: req.file
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});