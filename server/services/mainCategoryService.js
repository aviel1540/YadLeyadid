const MainCategory = require("../models/MainCategory");

exports.findAllMainCategory = async () => await MainCategory.find();

exports.findMainCategoryById = async (mainCategoryId) =>
	await MainCategory.findById(mainCategoryId);

exports.findMainCategoryByName = async (mainCategoryName) =>
	await MainCategory.findOne({ mainCategoryName });

exports.addNewMainCategory = async (checkName) => {
	return new MainCategory({
		mainCategoryName: checkName,
	});
};
