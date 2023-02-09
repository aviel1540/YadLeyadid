const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	productId: {
		type: Number,
	},
	productName: {
		type: String,
		trim: true,
		required: true,
	},
	place: {
		type: String,
		enum: ["מושאל", "קיים במלאי", "בתיקון"],
		default: "קיים במלאי",
	},
	loan_by: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
