const Product = require("../models/Product");
const { ProductPlace } = require("../constants/productPlace");
const { RequestStatus } = require("../constants/requestStatus");
const { request } = require("express");

exports.allProducts = async () => await Product.find();

exports.addProduct = async (productName) => new Product({ productName });

exports.findProductById = async (productId) =>
	await Product.findById(productId);

exports.updateProduct = async (id, productPlace) =>
	await Product.findByIdAndUpdate(id, { place: productPlace });

exports.deleteProduct = async (productId) =>
	await Product.findByIdAndRemove(productId);

exports.updateProductAssignToUser = async (request) => {
	const { productId, afterThreeMonth, checkUserId } = request;
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
		extensionRequest: RequestStatus.NOT_ASKED_EX_REQ,
		requestDate: null,
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
	const { checkProductId } = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		productName: "מוצר חדש",
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

exports.showProductDetailsInUser = async (productId) => {
	const product = await Product.findById(productId);
	return {
		id: product._id,
		productName: product.productName,
		loanDate: product.loanDate,
		loanReturn: product.loanReturn,
		inCategory: product.inCategory,
		requestDate: product.requestDate,
		extensionRequest: product.extensionRequest,
	};
};
exports.showProductDetailsInSemiCategory = async (productId) => {
	const product = await Product.findById(productId);
	return {
		productName: product.productName,
		place: product.place,
		inCategory: product.inCategory,
		id: product._id,
	};
};

exports.updateExtensionRequest = async (checkProductId, newReturnDate) => {
	return await Product.findByIdAndUpdate(checkProductId, {
		loanReturn: newReturnDate,
		extensionRequest: RequestStatus.ACCEPT,
		requestDate: null,
	});
};

exports.updateAlertRequest = async (productId, checkDate) => {
	return await Product.findByIdAndUpdate(productId, {
		requestDate: checkDate,
		extensionRequest: RequestStatus.WAITING,
	});
};

exports.unacceptExtensionRequest = async (checkProductId) => {
	return await Product.findByIdAndUpdate(checkProductId, {
		requestDate: null,
		extensionRequest: RequestStatus.REJECT,
	});
};
