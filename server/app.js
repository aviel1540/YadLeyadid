const express = require('express');
// require('dotenv').config()
const path = require('path');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 9000;
require(path.join(__dirname,'db/mongoose/connect.js'));

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));




app.listen(port ,() => {
    console.log("Connection Successful !");
})