const express = require('express');
const path = require('path');
const cors = require('cors');
const ProductRouter = require('./routers/product_detailes_router');

const app = express();
const port = process.env.PORT || 9000;
require(path.join(__dirname,'db/mongoose/connect.js'));

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/products", ProductRouter);


app.listen(port ,() => {
    console.log("Connection Successful !");
})