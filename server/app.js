const express = require('express');
require('dotenv').config()
const path = require('path');
const cors = require('cors');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());


// app.use(express.static(path.join(__dirname, 'public')));
require(path.join(__dirname,'/models/dbConnection.js'));

app.listen(port ,() => {
    console.log("Connection Successful !");
})