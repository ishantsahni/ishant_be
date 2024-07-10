const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
// const userModel = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
const userShoppingDetailsRoute = require('./routes/userShoppingDetailsRoutes');
const UserShoppingDetailsModel = require('./models/userShoppingDetailsModel');
require('dotenv').config();

const allowedOrigins = ['http:localhost:3000']

const app = express();

// Connect to MongoDB
connectDB();

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads');
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