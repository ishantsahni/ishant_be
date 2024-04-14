const express = require('express');
const cors = require('cors');
const allowedOrigins = ['http:localhost:3000']

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Data coming from backend data!');
})

app.get("/firstApi", (req, res) => {
    res.send(["Mango", "Apple", "Orange", "Banana"]);
})

app.listen(4000, () => {
    console.log(`Server is running on port 4000`)
});