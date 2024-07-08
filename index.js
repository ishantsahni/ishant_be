const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const userModel = require('./models/userModel');
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

app.post('/postUserData', async (req, res) => {
    try {
        const { firstName, lastName, age, email } = req.body;
        const userData = { firstName: firstName, lastName: lastName, age: age, email: email };
        console.log("user data ", userData);
        const newUserData = new userModel(userData);
        const saveUserData = await newUserData.save();
        if (saveUserData) {
            console.log(
                "data saved successfully!!"
            )
            res.send("User data saved successfully!");

        }

        res.end();
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving user data');
    }
})

// GET endpoint to fetch all user data
app.get('/getUserData', async (req, res) => {
    try {
        const userData = await userModel.find();
        console.log("fetched user data ", userData);
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).send('Error fetching user data');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});