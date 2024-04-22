const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const allowedOrigins = ['http:localhost:3000']

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Data coming from backend data!');
})

app.get("/firstApi", (req, res) => {
    res.send(["Mango", "Apple", "Orange", "Banana", "Grapes"]);
})

app.post('/postUserData', (req, res) => {
    console.log("req body of postUserData ", req.body);
    res.send("Got user data successfully!!");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});