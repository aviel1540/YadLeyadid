const MainCategory = require("../models/MainCategory");
const escape = require("escape-html");
const validation = require("../utils/validation");

exports.addNewMainCategory = async (req, res) => {
	const categoryName = escape(req.body.name);
	try {
		const checkName = validation.addSlashes(categoryName);

		const mainCategoryFound = await MainCategory.findOne({
			name: checkName,
		});
		if (mainCategoryFound)
			return res.status(400).json({ message: "הקטגוריה קיימת במערכת" });
		const mainCategory = new MainCategory({
			name: checkName,
		});
		await mainCategory.save();
		return res.status(201).json({ message: "הקטגוריה נוספה בהצלחה" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err });
	}
};

exports.searchMainCategory = async (req, res) => {
	try {
		const categories = await MainCategory.find();
		res.status(201).json({ categories });
	} catch (err) {
		res.status(400).json({ message: err });
	}
};

exports.deleteMainCategory = async (req, res) => {};

exports.getMainCategoryById = async (req, res) => {
	const idSearch = escape(req.params.id);
	try {
		const checkIdSearch = validation.addSlashes(idSearch);
		const category = await MainCategory.findById(checkIdSearch);
		if (!category) return res.status(400).send("No Category Found !");
		res.status(200).json({ category });
	} catch (err) {
		res.status(400).json({ message: err });
	}
};

exports.updateMainCategory = async (req, res) => {};

exports.asignSemiCategoryToMainCategory = async (req, res) => {};

exports.getSemiCategoryInMainCategory = async (req, res) => {};
