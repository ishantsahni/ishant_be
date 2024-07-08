const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
// const userModel = require('./models/userModel');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const allowedOrigins = ['http:localhost:3000']

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Data coming from backend data!');
})

app.get("/firstApi", (req, res) => {
    res.send(["Mango", "Apple", "Orange", "Banana", "Grapes"]);
})

app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});