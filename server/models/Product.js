const mongoose = require("mongoose");
const { ProductPlace } = require("../constants/productPlace");
const { RequestStatus } = require("../constants/requestStatus")

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
		type: String,
		trim: true,
	},
	loanDate: {
		type: Date,
		default: null,
	},
	loanReturn: {
		type: Date,
		default: null,
	},
	loanBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	extensionRequest: {
		type: String,
		default: RequestStatus.NOT_ASKED_EX_REQ,
	},
	requestDate: {
		type: Date,
		default: null,
	},
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
