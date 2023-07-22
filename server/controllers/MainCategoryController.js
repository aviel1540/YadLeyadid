const escape = require("escape-html");
const validation = require("../utils/validation");
const mainCategoryService = require("../services/mainCategoryService");
const semiCategoryService = require("../services/semiCategoryService");
const productService = require("../services/productService");

exports.getAllMainCategory = async (req, res) => {
	let mainCategories = [];
	let semiCategories = [];
	let detailes;
	let semi;
	try {
		const mainCategory = await mainCategoryService.findAllMainCategory();
		for (let i = 0; i < mainCategory.length; i++) {
			const mainDetailes = mainCategory[i];
			if (mainDetailes.semiCategoryList.length > 0) {
				for (let k = 0; k < mainDetailes.semiCategoryList.length; k++) {
					const semiId = mainDetailes.semiCategoryList[k];
					semi = await semiCategoryService.showSemiDetailsInMain(
						semiId
					);
					semiCategories.push(semi);
				}
				detailes = {
					_id: mainDetailes._id,
					mainCategoryName: mainDetailes.mainCategoryName,
					semiCategoryList: semiCategories,
				};
				mainCategories.push(detailes);
				semiCategories = [];
			} else {
				detailes = {
					_id: mainDetailes._id,
					mainCategoryName: mainDetailes.mainCategoryName,
					semiCategoryList: null,
				};
				mainCategories.push(detailes);
			}
		}

		return res.status(200).json(mainCategories);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.getMainCategoryById = async (req, res) => {
	const idSearch = escape(req.params.id);
	try {
		const checkIdSearch = validation.addSlashes(idSearch);
		const category = await mainCategoryService.findMainCategoryById(
			checkIdSearch
		);
		if (!category) return res.status(400).send("לא נמצאה קטגוריה.");
		res.status(200).json({ category });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.addMainCategory = async (req, res) => {
	const categoryName = escape(req.body.mainCategoryName);
	let mainCategory;
	try {
		const checkName = validation.addSlashes(categoryName);

		const mainCategoryFound =
			await mainCategoryService.findMainCategoryByName(checkName);
		if (mainCategoryFound)
			return res.status(400).json({ message: "הקטגוריה קיימת במערכת." });

		mainCategory = await mainCategoryService.addNewMainCategory(checkName);

		await mainCategory.save();
		return res.status(201).json({ message: "הקטגוריה נוספה בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.deleteMainCategory = async (req, res) => {
	const id = escape(req.params.id);
	try {
		const checkId = validation.addSlashes(id);
		const mainCategoryResult =
			await mainCategoryService.findMainCategoryById(checkId);
		if (!mainCategoryResult) {
			return res.status(404).json({ message: "לא נמצאה קטגוריה ראשית." });
		}
		if (mainCategoryResult.semiCategoryList.length > 0) {
			return res
				.status(400)
				.json({ message: "קיימות קטגוריות משוייכות." });
		}
		await mainCategoryService.deleteMainCategory(checkId);
		res.status(200).json({ message: "הקטגוריה נמחקה בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.updateMainCategory = async (req, res) => {
	const id = escape(req.params.id);
	const name = escape(req.body.mainCategoryName);

	let updateMainCategory;

	try {
		const checkId = validation.addSlashes(id);
		const checkName = validation.addSlashes(name);

		updateMainCategory =
			await mainCategoryService.updateMainCategoryDetails({
				checkId,
				checkName,
			});
		if (!updateMainCategory) {
			return res.status(404).json({ message: "לא נמצאה קטגוריה." });
		}
		await updateMainCategory.save();
		res.status(200).json({ message: "קטגוריה עודכנה בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.unassignSemiCategoryToMainCategory = async (req, res) => {
	const mainCategoryId = escape(req.params.id);
	const semiCategoryId = escape(req.params.semi_id);
	try {
		const checkMainCategoryId = validation.addSlashes(mainCategoryId);
		const checkSemiCategoryId = validation.addSlashes(semiCategoryId);

		const mainCategory = await mainCategoryService.findMainCategoryById(
			checkMainCategoryId
		);
		if (!mainCategory)
			return res.status(400).json({ message: "קטגוריה לא קיימת." });

		const semiCategoryExist = mainCategory.semiCategoryList.find(
			(id) => id.toString() === checkSemiCategoryId
		);

		if (!semiCategoryExist)
			return res
				.status(400)
				.json({ message: "הקטגוריה המשנית לא קיימת ברשימה." });

		mainCategory.semiCategoryList.pull(checkSemiCategoryId);

		const isFound = mainCategory.semiCategoryList.find(
			(semi) => semi.id.toString() === checkSemiCategoryId
		);

		if (isFound)
			return res.status(400).json({ message: "הסרת השיוך נכשלה." });

		await semiCategoryService.updateSemiCategoryUnassignMainCategory(
			checkSemiCategoryId
		);
		const semiCategory = await semiCategoryService.findSemiCategoryById(
			checkSemiCategoryId
		);
		if (semiCategory.productList > 0) {
			const productIdUpdate = semiCategory.productList[i]._id;
			for (let i = 0; i < semiCategory.productList.length; i++) {
				await productService.updateProductInCategoryUnassignSemiFromMain(
					productIdUpdate
				);
			}
		}
		await mainCategory.save();
		return res.status(200).json({ message: "הוסר השיוך בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.asignSemiCategoryToMainCategory = async (req, res) => {
	const mainCategoryId = escape(req.params.id);
	const semiArr = req.body;
	let manySemiCategoryIds = [];
	let mainCategory;
	try {
		const checkMainId = validation.addSlashes(mainCategoryId);

		mainCategory = await mainCategoryService.findMainCategoryById(
			checkMainId
		);

		if (!mainCategory) {
			return res.status(404).json({ message: "לא נמצאה קטגוריה ראשית." });
		}

		for (const i in semiArr.ids) {
			manySemiCategoryIds.push(escape(semiArr.ids[i]));
		}

		const semiCategories = manySemiCategoryIds.map(async (semiId) => {
			const checkSemiId = validation.addSlashes(semiId);
			const semiCategory = await semiCategoryService.findSemiCategoryById(
				checkSemiId
			);
			if (!semiCategory) throw new Error("לא נמצאה קטגוריה משנית");
			if (semiCategory.inMainCategory)
				throw new Error("קטגוריה משנית משוייכת לראשית אחרת");

			const semiExist = mainCategory.semiCategoryList.find(
				(id) => id.toString() === checkSemiId
			);

			if (semiExist) {
				return res
					.status(400)
					.json({ message: "הקטגוריה משוייכת לקטגוריה ראשית זו." });
			}

			mainCategory.semiCategoryList.push(checkSemiId);

			const isFound = mainCategory.semiCategoryList.find(
				(id) => id.toString() === checkSemiId
			);

			if (!isFound)
				return res.status(501).json({ message: "ההשאלה נכשלה" });

			let updatedInCategory = mainCategory.mainCategoryName;
			await semiCategoryService.updateAssignToMainCategory({
				checkSemiId,
				updatedInCategory,
			});
			if (semiCategory.productList.length > 0) {
				for (let i = 0; i < semiCategory.productList.length; i++) {
					const productIdUpdate = semiCategory.productList[i]._id;
					await productService.updateProductInCategoryAssignSemiToMain(
						{
							productIdUpdate,
							updatedInCategory,
						}
					);
				}
			}
		});
		await Promise.all(semiCategories);
		await mainCategory.save();
		res.status(201).json({ message: "השיוך בוצע בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
