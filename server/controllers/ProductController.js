const escape = require("escape-html");
const validation = require("../utils/validation");
const { ProductPlace } = require("../constants/productPlace");
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
				userLoan = await userService.showUserDetailsInProducts(
					productDetails.loanBy
				);
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
		return res.status(200).send(products);
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.addProduct = async (req, res) => {
	const productName = escape(req.body.productName);
	let product;

	try {
		if (!productName) {
			return res.status(400).json({ message: "יש למלא את השדות." });
		}

		const checkProductName = validation.addSlashes(productName);

		product = await productService.addProduct(checkProductName);

		await product.save();
		res.status(201).json(product);
	} catch (err) {
		return res.status(401).json({ message: err.message });
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
		return res.status(404).json({ message: err });
	}
};

exports.updateProduct = async (req, res) => {
	const productId = escape(req.params.id);
	const productName = escape(req.body.productName);

	let updateProduct;
	try {
		const checkId = validation.addSlashes(productId);
		const checkProductName = validation.addSlashes(productName);

		const product = await productService.findProductById(checkId);
		if (product.inCategory) {
			return res
				.status(400)
				.json({ message: "לא ניתן לשנות שם - משוייך לקטגוריה." });
		}

		updateProduct = await productService.updateProduct(
			checkId,
			checkProductName
		);

		if (!updateProduct)
			return res.status(401).json({ message: "מוצר לא קיים." });

		await updateProduct.save();
		return res.status(201).json({ message: "המוצר התעדכן בהצלחה." });
	} catch (err) {
		return res.status(400).json({ message: err });
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
			product.place == ProductPlace.LOANED ||
			product.place == ProductPlace.REPAIR
		) {
			return res
				.status(401)
				.json({ message: "לא ניתן למחוק - המוצר לא זמין במלאי." });
		}
		if (product.inCategory) {
			return res
				.status(401)
				.json({ message: "לא ניתן למחוק - משוייך לקטגוריה." });
		}

		await productService.deleteProduct(checkProductId);
		return res.status(200).json({ message: "המוצר נמחק בהצלחה." });
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};

exports.updateExtensionRequest = async (req, res) => {
	const productId = escape(req.params.id);
	const answer = escape(req.body.number);
	let product;
	let user;
	let updateProduct;
	try {
		const checkUserId = validation.addSlashes(userId);
		const checkProductId = validation.addSlashes(productId);
		const checkNumber = validation.addSlashes(number);

		user = await userService.findUserById(checkUserId);
		product = await productService.findProductById(checkProductId);

		if (!user) return res.status(404).json({ message: "לקוח לא קיים." });
		if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

		const isFound = user.productList.map(
			(product) => product.id.toString() === checkProductId
		);

		if (!isFound)
			return res.status(404).json({ message: "מוצר לא קיים אצל הלקוח" });

		const addNewLoanReturn = product.loanReturn;
		addNewLoanReturn.setMonth(
			product.loanReturn.getMonth() + Number(checkNumber)
		);
		updateProduct = await productService.updateExtensionRequest(
			checkProductId,
			addNewLoanReturn
		);

		if (!updateProduct)
			return res.status(404).json({ message: "העידכון נכשל" });

		await updateProduct.save();
		mailer.sendMailFunc(
			user.email,
			`המוצר ${product.productName} הוארך בהצלחה `
		);
		return res.status(201).json({ message: "תאריך ההחזרה הוארך בהצלחה" });
	} catch (err) {
		return res.status(401).json({ message: err.message });
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

		if (product.requestDate)
			return res.status(400).json({
				message:
					"לא ניתן לבקש הארכה נוספת - יש ליצור קשר עם נציג שירות.",
			});
		const askedDate = new Date(checkDate);
		if(askedDate < product.loanReturn) return res.status(400).json({message: " תאריך לא תקין"});
		console.log(askedDate);

		await productService.updateAlertRequest(checkProductId, askedDate);
		await product.save();
		console.log(product.requestDate);
		return res.status(201).json({ message: "הבקשה נשלחה בהצלחה." });
	} catch (err) {
		return res.status(400).json({ message: err.message });
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
		return res.status(201).json(products);
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};
