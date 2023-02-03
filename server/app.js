require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const productRouter = require("./routers/productDetailsRouter");
const userRouter = require("./routers/userRouter");
const URI = process.env.URI;
const URL = process.env.URL;

mongoose.set("strictQuery", true);
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: URL }));

mongoose
  .connect(URI)
  .then(() => console.log("Connected to DataBase"))
  .catch((err) => console.log(err.message));

app.use("/products", productRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Connection Successful!");
});
