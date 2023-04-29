const SemiCategory = require("../models/SemiCategory");

exports.allSemiCategory = async () => await SemiCategory.find();

exports.findSemiCategoryById = async (semiCategoryId) =>
	await SemiCategory.findById(semiCategoryId);

exports.addSemiCategory = async (request) => {
	const { checkSerialNumber, checkName } = request;

	return new SemiCategory({
		serialNumber: checkSerialNumber,
		name: checkName,
		quantity: 0,
	});
};

exports.findSemiCategoryBySerialNumber = async (serialNumber) =>
	await SemiCategory.findOne({ serialNumber });

exports.findSemiCategoryByName = async (name) => {
	console.log(await SemiCategory.findOne({ name }));
	return await SemiCategory.findOne({ name });
};

exports.updateSemiCategory = async (request) => {
	const { checkId, checkSerialNumber, checkName } = request;

	return await SemiCategory.findByIdAndUpdate(checkId, {
		serialNumber: checkSerialNumber,
		name: checkName,
	});
};

exports.deleteSemiCategory = async (semiCategoryId) =>
	await SemiCategory.findByIdAndRemove(semiCategoryId);

exports.updateAssignToMainCategory = async (request) => {
	const { checkSemiId, updatedInCategory } = request;

	return await SemiCategory.findByIdAndUpdate(checkSemiId, {
		inMainCategory: updatedInCategory,
	});
};
