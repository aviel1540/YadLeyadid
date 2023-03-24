const mongoose = require("mongoose");
const { ProductPlace } = require("../constants/productPlace");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	productId: {
		type: Number,
		default: 0,
	},
	productName: {
		type: String,
		trim: true,
		required: true,
	},
	place: {
		type: String,
		enum: [ProductPlace.LOANED, ProductPlace.IN_STOCK, ProductPlace.REPAIR],
		default: ProductPlace.IN_STOCK,
	},
	inCategory: {
		type: Boolean,
		//false - not in any category
		default: false,
	},
	loanDate: {
		type: Date,
		default: "1970-01-01",
	},
	loanReturn: {
		type: Date,
		default: "1970-01-01",
	},
	loanBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
