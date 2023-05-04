const Product = require("../models/Product");
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

exports.updateProduct = async (id, productName) =>
	await Product.findByIdAndUpdate(id, {
		productName,
	});

exports.deleteProduct = async (productId) =>
	await Product.findByIdAndRemove(productId);

exports.updateProductAssignToUser = async (productId, request) => {
	const { afterThreeMonth, checkUserId } = request;
	return await Product.findByIdAndUpdate(productId, {
		place: ProductPlace.LOANED,
		loanDate: Date.now(),
		loanReturn: afterThreeMonth,
		loanBy: checkUserId,
	});
};

exports.updateProductUnassignToUser = async (productId) => {
	return await Product.findByIdAndUpdate(productId, {
		place: ProductPlace.IN_STOCK,
		loanDate: null,
		loanReturn: null,
		loanBy: null,
	});
};

exports.updateProductAssignToSemiCategory = async (request) => {
	const { checkProductId, productNewName, productInCategory } = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		productName: productNewName,
		inCategory: productInCategory,
	});
};
exports.updateProductUnassignToSemiCategory = async (request) => {
	const { checkProductId, productName } = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		productName: productName,
		inCategory: null,
	});
};

exports.updateProductsNameInSemiCategoryList = async (request) => {
	const { productIdUpdate, productNewName } = request;
	return await Product.findByIdAndUpdate(productIdUpdate, {
		productName: productNewName,
	});
};

exports.updateProductInCategoryUnassignSemiFromMain = async (productId) => {
	return await Product.findByIdAndUpdate(productId, {
		inCategory: null,
	});
};

exports.updateProductInCategoryAssignSemiToMain = async (request) => {
	const { productIdUpdate, updatedInCategory } = request;
	return await Product.findByIdAndUpdate(productIdUpdate, {
		inCategory: updatedInCategory,
	});
};
