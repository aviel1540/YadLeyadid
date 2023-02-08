const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const productDetailsSchema = new Schema({
  productDetail: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  loanDetails: {
    type: Object,
    loanBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    loanDate: {
      type: Date,
      default: new Date(),
      validate(value) {
        if (validator.isAfter(value.toString()))
          throw new Error("Invalid date for 'Loan Date' , it is in the future !");
      },
    },
    returnDate: {
      type: Date,
      validate(value) {
        if (validator.isBefore(value.toString(), this.begin_date.toString()))
          throw new Error("Invalid date for 'Loan Date' , it is in the past !");
      },
    },
  },
});

const ProductDetailes = mongoose.model("product-detailes", productDetailsSchema);
module.exports = ProductDetailes;
