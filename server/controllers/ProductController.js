const escape = require("escape-html");
const validation = require("../utils/validation");
const { ProductPlace } = require("../constants/productPlace");
const { RequestStatus } = require("../constants/requestStatus");
const productService = require("../services/productService");
const userService = require("../services/userService");
const mailer = require("../utils/mailer");

exports.getProducts = async (req, res) => {
	let products = [];
	let details;
	let userLoan;
	try {
		const product = await productService.allProducts();
		for (let i = 0; i < product.length; i++) {
			const productDetails = product[i];
			if (productDetails.loanBy) {
				userLoan = await userService.userDetails(productDetails.loanBy);
				details = {
					_id: productDetails._id,
					productName: productDetails.productName,
					place: productDetails.place,
					loanDate: productDetails.loanDate,
					loanReturn: productDetails.loanReturn,
					inCategory: productDetails.inCategory,
					extensionRequest: productDetails.extensionRequest,
					userDetails: [userLoan],
				};
				products.push(details);
			} else {
				products.push(productDetails);
			}
		}
	const sortedProducts =	products.sort((a, b) => b.place.localeCompare(a.place))

		return res.status(200).send(sortedProducts);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.addProduct = async (req, res) => {
	const productName = escape(req.body.productName);
	let product;

	try {
		if (!productName) {
			return res.status(400).json({ message: "נא למלא את השדה." });
		}

		const checkProductName = validation.addSlashes(productName);

		product = await productService.addProduct(checkProductName);

		await product.save();
		return res.status(201).json({ message: "מוצר נוסף בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getProductById = async (req, res) => {
	const productId = escape(req.params.id);
	let product;
	try {
		const checkProductId = validation.addSlashes(productId);

		product = await productService.findProductById(checkProductId);
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.updateProductLocation = async (req, res) => {
	const productId = escape(req.params.id);
	const productPlace = escape(req.body.productPlace);

	let updateProduct;
	let place;
	try {
		const checkId = validation.addSlashes(productId);
		const checkProductPlace = validation.addSlashes(productPlace);

		if (!checkProductPlace)
			return res.status(400).json({ message: "נא למלא את כל השדות." });

		const product = await productService.findProductById(checkId);

		if (product.place === ProductPlace.LOANED)
			return res
				.status(400)
				.json({ message: "לא ניתן לשנות מיקום למוצר מושאל." });

		if (checkProductPlace === ProductPlace.IN_STOCK)
			place = ProductPlace.IN_STOCK;
		else if (checkProductPlace === ProductPlace.REPAIR)
			place = ProductPlace.REPAIR;
		else return res.status(400).json({ message: "מיקום לא תקין." });

		updateProduct = await productService.updateProduct(checkId, place);

		if (!updateProduct)
			return res.status(404).json({ message: "מוצר לא קיים." });

		await updateProduct.save();
		return res.status(200).json({ message: "המוצר התעדכן בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.deleteProduct = async (req, res) => {
	const productId = escape(req.params.id);
	let product;
	try {
		const checkProductId = validation.addSlashes(productId);

		product = await productService.findProductById(checkProductId);

		if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

		if (
			product.place === ProductPlace.LOANED ||
			product.place === ProductPlace.REPAIR
		) {
			return res
				.status(400)
				.json({ message: "לא ניתן למחוק - המוצר לא זמין במלאי." });
		}
		if (product.inCategory) {
			return res
				.status(400)
				.json({ message: "לא ניתן למחוק - משוייך לקטגוריה." });
		}

		await productService.deleteProduct(checkProductId);
		return res.status(200).json({ message: "המוצר נמחק בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.updateExtensionRequest = async (req, res) => {
	const productId = escape(req.params.id);
	const answer = escape(req.body.answer);

	let product;
	let user;
	let updateProduct;
	try {
		const checkProductId = validation.addSlashes(productId);
		const checkAnswer = validation.addSlashes(answer);
		product = await productService.findProductById(checkProductId);
		if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

		user = await userService.findUserById(product.loanBy);
		if (checkAnswer === RequestStatus.REJECT) {
			mailer.sendMailFunc(
				"updateExtensionRequest",
				user.email,
				`למוצר ${validation.replace(
					product.productName
				)} לא אושרה הארכת השאלה, יש ליצור קשר עם המוקד.`
			);
			productService.unacceptExtensionRequest(checkProductId);
			return res
				.status(200)
				.json({ message: "ביטול הארכה בוצע בהצלחה." });
		}
		const returnDate = product.requestDate;
		updateProduct = await productService.updateExtensionRequest(
			checkProductId,
			returnDate
		);

		if (!updateProduct)
			return res.status(400).json({ message: "העידכון נכשל." });

		await updateProduct.save();
		mailer.sendMailFunc(
			"updateExtensionRequest",
			user.email,
			`המוצר ${product.productName} הוארך בהצלחה `
		);
		return res.status(200).json({ message: "תאריך ההחזרה הוארך בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.askForExtensionRequest = async (req, res) => {
	const productId = escape(req.params.id);
	const date = escape(req.body.date);
	let product;

	try {
		const checkProductId = validation.addSlashes(productId);
		const checkDate = validation.addSlashes(date);

		product = await productService.findProductById(checkProductId);

		if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

		if (product.extensionRequest === RequestStatus.ACCEPT)
			return res.status(400).json({
				message:
					"לא ניתן לבקש הארכה נוספת - יש ליצור קשר עם נציג שירות.",
			});
		const askedDate = new Date(checkDate);
		if (askedDate < product.loanReturn)
			return res.status(400).json({ message: " תאריך לא תקין" });

		await productService.updateAlertRequest(checkProductId, askedDate);
		await product.save();
		return res.status(200).json({ message: "הבקשה נשלחה בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.allProductsWithLoanDateClose = async (req, res) => {
	const today = new Date();
	let products = [];
	let detailes;
	let userLoan;
	try {
		const product = await productService.allProducts();
		for (let i = 0; i < product.length; i++) {
			const productDetails = product[i];
			if (productDetails.loanBy) {
				const timeDiff = Math.abs(
					productDetails.loanReturn.getTime() - today.getTime()
				);
				const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				if (diffDays <= 5) {
					userLoan = await userService.findUserById(
						productDetails.loanBy
					);
					detailes = {
						productName: productDetails.productName,
						name: userLoan.name,
						loanDate: productDetails.loanDate,
						loanReturn: productDetails.loanReturn,
						days: diffDays,
						phoneNumber: userLoan.phoneNumber,
					};
					products.push(detailes);
				}
			}
		}
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.allProductsWaitConfirmExtensionRequest = async (req, res) => {
	let products = [];
	let details;
	let user;
	try {
		const product = await productService.allProducts();
		for (let i = 0; i < product.length; i++) {
			const productDetails = product[i];
			if (productDetails.requestDate) {
				user = await userService.findUserById(productDetails.loanBy);
				details = {
					productName: productDetails.productName,
					loanDate: productDetails.loanDate,
					loanReturn: productDetails.loanReturn,
					requestDate: productDetails.requestDate,
					id: productDetails._id,
					name: user.name,
				};
				products.push(details);
			}
		}
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.allProductsAcceptedExtensionRequest = async (req, res) => {
	let products = [];
	let details;
	let user;
	try {
		const product = await productService.allProducts();
		for (let i = 0; i < product.length; i++) {
			const productDetails = product[i];
			if (productDetails.extensionRequest) {
				user = await userService.findUserById(productDetails.loanBy);
				details = {
					productName: productDetails.productName,
					loanDate: productDetails.loanDate,
					loanReturn: productDetails.loanReturn,
					requestDate: productDetails.requestDate,
					name: user.name,
				};
				products.push(details);
			}
		}
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.productsCounters = async (req, res) => {
	let details;
	try {
		details = {
			inStock: 0,
			loaned: 0,
			repair: 0,
		};
		const products = await productService.allProducts();
		products.map((product) => {
			if (product.place == ProductPlace.IN_STOCK) details.inStock++;
			else if (product.place == ProductPlace.LOANED) details.loaned++;
			else details.repair++;
		});
		res.status(200).json(details);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
