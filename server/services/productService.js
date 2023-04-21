const Product = require("../models/Product");
const User = require("../models/User");

exports.allProducts = async () => await Product.find();

exports.addProduct = async (request) => {
	const { checkProductName } = request;

	return new Product({
		productName: checkProductName,
	});
};

exports.checkProduct = async (productId) => {
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

// exports.checkProductInCategory = async (productId) => {
// 	const product = await Product.findById(productId);
// 	if (!product.inCategory) return false;
// 	return true;
// };

// exports.checkProductPlace = async (productId) => {
// 	const product = await Product.findById(productId);
// 	if (product.place !== ProductPlace.IN_STOCK) return false;
// 	return true;
// };

// exports.checkProductExistInUser = async (productId, userId) => {
// 	const user = await User.findById(userId);

// 	const productExist = user.productList.find(
// 		(id) => id.toString() === productId
// 	);
// 	if (productExist) return false;
// 	return true;
// };
