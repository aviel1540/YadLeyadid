const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productDetailsSchema = new Schema(
  {
    serialNumber: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductDetails = mongoose.model("products", productDetailsSchema);
module.exports = ProductDetails;
