const Product = require("../models/Product");
const User = require("../models/User");
const { ProductPlace } = require("../constants/productPlace");


exports.allProducts = async () => await Product.find();

exports.addProduct = async (request) => {
	const { checkProductName } = request;

	return new Product({
		productName: checkProductName,
	});
};

exports.findProductById = async (productId) => {
	const product = await Product.findById(productId);

	if (!product) return false;
	return product;
};

exports.updateProduct = async (request) => {
	const { checkId, checkProductName } = request;

	return await Product.findByIdAndUpdate(checkId, {
		productName: checkProductName,
	});
};

exports.deleteProduct = async (productId) =>
	await Product.findByIdAndDelete(productId);

exports.updateProductAsingToUser = async(request) => {
	const {checkProductId, afterThreeMonth, checkUserId} = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		place: ProductPlace.LOANED,
		loanDate: Date.now(),
		loanReturn: afterThreeMonth,
		loanBy: checkUserId
	});
}