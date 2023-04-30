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

exports.updateProduct = async (request) => {
	const { checkId, checkProductName } = request;

	return await Product.findByIdAndUpdate(checkId, {
		productName: checkProductName,
	});
};

exports.deleteProduct = async (productId) =>
	await Product.findByIdAndRemove(productId);

exports.updateProductAssignToUser = async(productId,request) => {
	const {afterThreeMonth, checkUserId} = request;
	return await Product.findByIdAndUpdate(productId, {
		place: ProductPlace.LOANED,
		loanDate: Date.now(),
		loanReturn: afterThreeMonth,
		loanBy: checkUserId
	});
}

exports.updateProductUnassignToUser = async(productId) => {
	return await Product.findByIdAndUpdate(productId, {
		place: ProductPlace.IN_STOCK,
		loanDate: null,
		loanReturn: null,
		loanBy: null
	});
}

exports.updateProductAssignToSemiCategory = async(request) => {
	const {checkProductId, productNewName, productInCategory} = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		productName: productNewName,
		inCategory: productInCategory
	})
}
exports.updateProductUnassignToSemiCategory = async(request) => {
	const {checkProductId, productName} = request;
	return await Product.findByIdAndUpdate(checkProductId, {
		productName: productName,
		inCategory: null
	})
}

exports.updateProductsNameInSemiCategoryList = async (request) => {
	const { productIdUpdate, productNewName} = request;
	return await Product.findByIdAndUpdate(productIdUpdate, {
		productName: productNewName
	})
}