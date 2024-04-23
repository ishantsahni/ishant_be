const express = require('express');
const connectDB = require('./config/db');
const MyModel = require('./models/myModel');
const ProductModel = require('./models/productModel');
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
    const newEntry = new MyModel({
        name: req.body.name,
        dish: req.body.dish,
        color: req.body.color,
        city: req.body.city
    })

    newEntry.save().then((result) => {
        console.log("entry added successfully");
        res.send("Got user data successfully!!");
    }).catch((error) => {
        console.log('Error saving data: ', error);
    })
})

app.post('/addProducts', (req, res) => {
    const newProduct = new ProductModel({
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice
    })

    newProduct.save().then((res) => {
        console.log("New product successfully added");
    }).catch(err => {
        console.log("Error occured while adding new product: ", err);
    })

})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});