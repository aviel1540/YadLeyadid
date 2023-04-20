const Product = require("../models/Product");
const User = require("../models/User");


exports.checkProductInCategory = async(productId) => {
	const product = await Product.findById(productId);
	if(!product.inCategory) return false;
	return true;
}

exports.checkProduct = async (productId) => {
	const product = await Product.findById(productId);
	if (!product) return false;
	return true;
};

exports.checkProductPlace = async (productId) => {
	const product = await Product.findById(productId);
	if (product.place !== ProductPlace.IN_STOCK) return false;
	return true;
};

exports.checkProductExistInUser = async (productId, userId) => { 
	const user = await User.findById(userId);

	const productExist = user.productList.find(
		(id) => id.toString() === productId
	);
	if (productExist) return false;
	return true;
};

