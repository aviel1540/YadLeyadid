const Product = require("../models/Product");
const { ProductPlace } = require("../constants/productPlace");

exports.allProducts = async () => await Product.find();

exports.addProduct = async (productName) => new Product({productName});

exports.findProductById = async (productId) => await Product.findById(productId);


exports.updateProduct = async (id, productName) =>
	await Product.findByIdAndUpdate(id, {productName});

exports.deleteProduct = async (productId) =>
	await Product.findByIdAndRemove(productId);

exports.updateProductAssignToUser = async (request) => {
	const {productId, afterThreeMonth, checkUserId } = request;
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
		extensionRequest: false,
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

exports.showProductDetailsInUser = async(productId) => {
	const product = await Product.findById(productId);
	return {
		productName: product.productName,
		loanDate: product.loanDate,
		loanReturn: product.loanReturn,
		inCategory: product.inCategory
	}
}
exports.showProductDetailsInSemiCategory = async(productId) => {
	const product = await Product.findById(productId);
	return {
		productName: product.productName,
		place: product.place,
		inCategory: product.inCategory
	}
}

exports.updateExtensionRequest = async(checkProductId,addNewLoanReturn) => {
	return await Product.findByIdAndUpdate(checkProductId, {
		loanReturn: addNewLoanReturn,
		extensionRequest: true
	})
}
