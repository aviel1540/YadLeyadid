require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
mongoose.set('strictQuery', true);

const ProductRouter = require('./routers/productDetailesRouter');
const UserRouter = require('./routers/userRouter');


const URI = process.env.URI;
const URL = process.env.URL;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: URL }));
mongoose
	.connect(URI)
	.then(() => console.log("Connected to DataBase"))
	.catch((err) => console.log(err.message));
    
app.use("/products", ProductRouter);
app.use("/users", UserRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT ,() => {
    console.log("Connection Successful !");
})