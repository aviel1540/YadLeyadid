const express = require('express');
require('dotenv').config()
const path = require('path');
const cors = require('cors');
require(path.join(__dirname,'/db/mongoose/connect.js'));

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


app.listen(port ,() => {
    console.log("Connection Successful !");
})