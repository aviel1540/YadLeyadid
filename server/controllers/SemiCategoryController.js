const escape = require("escape-html");
const validation = require("../utils/validation");
const semiCategoryService = require("../services/semiCategoryService");

const productService = require("../services/productService");

exports.getAllSemiCategories = async (req, res) => {
	let semiCategories = [];
	let products = [];
	let details;
	let product;
	try {
		const semiCategory = await semiCategoryService.allSemiCategory();
		for (let i = 0; i < semiCategory.length; i++) {
			const semiDetails = semiCategory[i];
			if (semiDetails.productList.length > 0) {
				for (let k = 0; k < semiDetails.productList.length; k++) {
					const productId = semiDetails.productList[k];
					product =
						await productService.showProductDetailsInSemiCategory(
							productId
						);
					products.push(product);
				}
				details = {
					_id: semiDetails._id,
					serialNumber: semiDetails.serialNumber,
					semiCategoryName: semiDetails.name,
					inMainCategory: semiDetails.inMainCategory,
					productList: products,
				};
				semiCategories.push(details);
				products = [];
			} else {
				details = {
					_id: semiDetails._id,
					serialNumber: semiDetails.serialNumber,
					semiCategoryName: semiDetails.name,
					inMainCategory: semiDetails.inMainCategory,
					productList: null,
				};
				semiCategories.push(details);
			}
		}
		const sortSemiCategories = semiCategories.sort(
			(a, b) => a.serialNumber - b.serialNumber
		);

		return res.status(200).json(sortSemiCategories);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getSemiCategoryById = async (req, res) => {
	const idSearch = escape(req.params.id);
	try {
		const checkIdSearch = validation.addSlashes(idSearch);
		const category = await semiCategoryService.findSemiCategoryById(
			checkIdSearch
		);
		if (!category) return res.status(404).send("קטגוריה לא נמצאה.");
		res.status(200).json({ category });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addNewSemiCategory = async (req, res) => {
	const serialNumber = escape(req.body.serialNumber);
	const name = escape(req.body.name);
	let category;
	try {
		const checkSerialNumber = validation.addSlashes(serialNumber);
		const checkName = validation.addSlashes(name);

		const categoryFoundSerial =
			await semiCategoryService.findSemiCategoryBySerialNumber(
				checkSerialNumber
			);
		if (categoryFoundSerial) {
			return res
				.status(400)
				.json({ message: "המספר סריאלי קיים במערכת." });
		}
		const categoryFoundName =
			await semiCategoryService.findSemiCategoryByName(checkName);
		if (categoryFoundName) {
			return res
				.status(400)
				.json({ message: "השם של הקטגוריה קיים במערכת." });
		}

		category = await semiCategoryService.addSemiCategory({
			checkSerialNumber,
			checkName,
		});

		await category.save();
		return res.status(201).json({ message: "קטגוריה נוספה בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.updateSemiCategoryDetails = async (req, res) => {
	const id = escape(req.params.id);
	const serialNumber = escape(req.body.serialNumber);
	const name = escape(req.body.name);

	let updatedCategory;
	try {
		const checkId = validation.addSlashes(id);
		const checkSerialNumber = validation.addSlashes(serialNumber);
		const checkName = validation.addSlashes(name);

		updatedCategory = await semiCategoryService.updateSemiCategory({
			checkId,
			checkSerialNumber,
			checkName,
		});

		if (!updatedCategory) {
			return res.status(404).json({ message: "לא נמצאה קטגוריה." });
		}
		await updatedCategory.save();

		res.status(200).json({ message: "קטגוריה עודכנה בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.deleteSemiCategory = async (req, res) => {
	const id = escape(req.params.id);
	try {
		const checkId = validation.addSlashes(id);
		const categoryResult = await semiCategoryService.findSemiCategoryById(
			checkId
		);
		if (!categoryResult) {
			return res.status(404).json({ message: "לא נמצאה קטגוריה." });
		}
		if (categoryResult.quantity > 0) {
			return res
				.status(401)
				.json({ message: "יש למחוק את המוצרים המשוייכים." });
		}
		if (categoryResult.inMainCategory) {
			return res
				.status(501)
				.json({ message: "משוייך לקטגוריה ראשית - יש לבטל שיוך." });
		}
		await semiCategoryService.deleteSemiCategory(checkId);
		res.status(200).json({ message: "נמחק בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


exports.unassignProductFromSemiCategory = async (req, res) => {
	const semiId = escape(req.params.id);
	const productId = escape(req.params.productId);

	try {
		const checkSemiId = validation.addSlashes(semiId);
		const checkProductId = validation.addSlashes(productId);

		const semiCategory = await semiCategoryService.findSemiCategoryById(
			checkSemiId
		);

		if (!semiCategory)
			return res.status(400).json({ message: "קטגוריה לא קיימת." });

		const productExist = semiCategory.productList.find(
			(id) => id.toString() === checkProductId
		);

		if (!productExist)
			return res.status(400).json({ message: "המוצר לא קיים בקטגוריה." });

		const indexProduct = semiCategory.productList.indexOf(checkProductId);

		semiCategory.productList.pull(checkProductId);

		const isFound = semiCategory.productList.find(
			(product) => product.id.toString() === checkProductId
		);

		if (isFound)
			return res.status(501).json({ message: "הסרת השיוך נכשלה." });
		let productName = semiCategory.name;
		await productService.updateProductUnassignToSemiCategory({
			checkProductId,
			productName,
		});

		semiCategory.quantity = semiCategory.productList.length;

		for (let i = indexProduct; i < semiCategory.productList.length; i++) {
			const productNewName = `${semiCategory.name} ${i + 1}`;
			const productIdUpdate = semiCategory.productList[i]._id;
			await productService.updateProductsNameInSemiCategoryList({
				productIdUpdate,
				productNewName,
			});
		}
		await semiCategory.save();

		return res
			.status(200)
			.json({ message: "הוסר שיוך בהצלחה.", semiCategory });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.assignProductToSemiCategory = async (req, res) => {
	const categoryId = escape(req.params.id);
	const productsArr = req.body;
	let manyProductsIds = [];
	let semiCategory;
	try {
		const checkCategoryId = validation.addSlashes(categoryId);

		semiCategory = await semiCategoryService.findSemiCategoryById(
			checkCategoryId
		);

		if (!semiCategory)
			return res.status(404).json({ message: " לא נמצאה קטגוריה." });

		for (const i in productsArr.ids) {
			manyProductsIds.push(escape(productsArr.ids[i]));
		}

		const products = manyProductsIds.map(async (productId) => {
			const checkProductId = validation.addSlashes(productId);
			const product = await productService.findProductById(
				checkProductId
			);

			if (!product) throw new Error("מוצר לא קיים");
			if (product.inCategory)
				throw new Error("המוצר משויך לקטגוריה אחרת");

			const productExist = semiCategory.productList.find(
				(id) => id.toString() === checkProductId
			);

			if (productExist) throw new Error("המוצר קיים בקטגוריה");

			semiCategory.productList.push(checkProductId);

			const isFound = semiCategory.productList.find(
				(id) => id.toString() === checkProductId
			);

			if (!isFound)
				return res.status(501).json({ message: "ההשאלה נכשלה" });

			let cntQuantity = semiCategory.quantity + 1;
			semiCategory.quantity = cntQuantity;
			let productNewName = `${semiCategory.name} ${cntQuantity}`;
			let productInCategory = semiCategory.inMainCategory;
			await productService.updateProductAssignToSemiCategory({
				checkProductId,
				productNewName,
				productInCategory,
			});
		});

		await Promise.all(products);
		await semiCategory.save();
		return res.status(201).json({ message: "שוייך בהצלחה.", semiCategory });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
