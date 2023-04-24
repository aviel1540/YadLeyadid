const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const escape = require("escape-html");
const validation = require("../utils/validation");
const { sendMail } = require("./sendMail");
const { ProductPlace } = require("../constants/productPlace");
const userService = require("../services/userService");
const productService = require("../services/productService");

exports.register = async (req, res) => {
	const idTeuda = escape(req.body.idTeuda);
	const username = escape(req.body.username);
	const name = escape(req.body.name);
	const password = escape(req.body.password);
	const email = escape(req.body.email);
	const phoneNumber = escape(req.body.phoneNumber);
	const address = escape(req.body.address);
	const paymentType = escape(req.body.paymentType);

	let user;
	try {
		if (
			!idTeuda ||
			!name ||
			!username ||
			!password ||
			!email ||
			!phoneNumber ||
			!address ||
			!paymentType
		) {
			return res.status(400).json({ message: "נא למלא את כל השדות." });
		}
		if (!validation.iDValidator(idTeuda)) {
			return res.status(400).json({ message: "תעודת זהות לא תקינה." });
		}

		if (!validation.checkEmail(email)) {
			return res.status(400).json({ message: "מייל לא תקין." });
		}

		if (!validation.checkUsername(name)) {
			return res.status(400).json({
				message: "שם צריך להכיל מינימום 2 תווים.",
			});
		}

		if (!validation.checkPassword(password)) {
			return res
				.status(400)
				.json({ message: "סיסמא צריכה להכיל מינימום 9 תווים." });
		}

		const checkIdTeuda = validation.addSlashes(idTeuda);
		const checkUsername = validation.addSlashes(username);
		const checkName = validation.addSlashes(name);
		const checkPassword = validation.addSlashes(password);
		const checkEmail = validation.addSlashes(email);
		const checkPhoneNumber = validation.addSlashes(phoneNumber);
		const checkAddress = validation.addSlashes(address);
		const checkPaymentType = validation.addSlashes(paymentType);

		const userUsername = await userService.findByUsername(checkUsername);

		if (userUsername) {
			return res.status(400).json({ message: "שם משתמש קיים במערכת." });
		}

		const userIdTeuda = await userService.findByIdTeuda(checkIdTeuda);

		if (userIdTeuda) {
			return res
				.status(400)
				.json({ message: "תעודת זהות קיימת במערכת." });
		}

		const userEmail = await userService.findByEmail(checkEmail);;
		if (userEmail) {
			return res.status(400).json({ message: "מייל קיים במערכת." });
		}

		const userPhoneNumber = await userService.findByPhoneNumber(checkPhoneNumber);
		if (userPhoneNumber) {
			return res
				.status(400)
				.json({ message: "מספר פלאפון קיים במערכת." });
		}

		const passwordHash = await auth.hashPassword(checkPassword);

		user = await userService.addUser({ checkIdTeuda, checkUsername, checkName, checkEmail, passwordHash, checkPhoneNumber, checkAddress, checkPaymentType });

		await user.save();
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
	if (!user) {
		return res.status(500).json({ message: "לא נוסף המשתמש." });
	}
	return res.status(201).json(user);
};

exports.login = async (req, res) => {
	const idTeuda = escape(req.body.idTeuda);
	const password = escape(req.body.password);

	try {
		if (!idTeuda || !password) {
			return res.status(400).json({ message: "נא למלא את כל השדות." });
		}
		const checkIdTeuda = validation.addSlashes(idTeuda);
		const checkPassword = validation.addSlashes(password);

		const user = await auth.login(checkIdTeuda, checkPassword);
		if (!user) {
			return res
				.status(400)
				.json({ message: "שם משתמש או סיסמא שגויים." });
		}
		const token = jwt.sign(
			{
				username: user.username,
				name: user.name,
				isAdmin: user.isAdmin,
			},
			process.env.ACTIVATION_TOKEN_SECRET
		);

		return res.status(200).json(token);
	} catch (err) {
		return res.status(401).json({ message: err });
	}
};

exports.deleteUser = async (req, res) => {
	const userId = escape(req.params.id);
	let user;
	try {
		const checkUserId = validation.addSlashes(userId);

		user = await userService.findUserById(checkUserId);

		if (!user) return res.status(404).json({ message: "לא קיים משתמש." });

		if (user.productList.length > 0) {
			return res
				.status(401)
				.json({ message: "לא ניתן למחוק, קיימים מוצרים ללקוח." });
		}

		user = await userService.deleteUser(checkUserId);

		return res.status(200).json({ message: "המשתמש נמחק בהצלחה." });
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.allUsers();
		return res.status(200).send(users);
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};

exports.getUserByUsername = async (req, res) => {
	const username = escape(req.params.username);
	let user;
	try {
		const checkUsername = validation.addSlashes(username);
		user = await userService.findByUsername({ username: checkUsername });
		if (!user) {
			return res.status(404).json({ message: "לא קיים משתמש." });
		}
	} catch (err) {
		return res.status(400).json({ message: err });
	}

	return res.status(200).json(user);
};

exports.getUserById = async (req, res) => {
	const userId = escape(req.params.id);

	let user;
	try {
		const checkUserId = validation.addSlashes(userId);

		user = await userService.findUserById(checkUserId);

		if (!user) {
			return res.status(404).json({ message: "לא קיים משתמש." });
		}
		return res.status(200).json(user);
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};

exports.updatePassword = async (req, res) => {
	const userId = escape(req.params.id);
	const newPassword = escape(req.body.password);

	try {
		if (!validation.checkPassword(newPassword)) {
			return res
				.status(400)
				.json({ message: "סיסמא צריכה להכיל מינימום 9 תווים." });
		}

		const checkUserId = validation.addSlashes(userId);
		const password = await auth.hashPassword(newPassword);

		await userService.updateUserPassword(checkUserId, { password });

		return res.status(200).json({ message: "עודכן בהצלחה." });
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.addProductForUser = async (req, res) => {
	const userId = escape(req.params.user_id);
	const productId = escape(req.params.product_id);

	const afterThreeMonth = new Date();
	afterThreeMonth.setMonth(afterThreeMonth.getMonth() + 3);

	try {
		const checkUserId = validation.addSlashes(userId);
		const checkProductId = validation.addSlashes(productId);

		const user = await userService.findUserById(checkUserId);
		if (!user) return res.status(404).json({ message: "לקוח לא קיים." });

		const product = await productService.findProductById(checkProductId);
		if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

		if (product.place !== ProductPlace.IN_STOCK)
			return res.status(400).json({ message: "מוצר לא זמין." });

		const productExist = user.productList.find(
			(id) => id.toString() === checkProductId
		);

		if (product.recognizer === 0)
			return res
				.status(400)
				.json({
					message: "יש לשייך את המוצר לקטגוריה לפני ההשאלה ללקוח",
				});

		if (productExist)
			return res.status(400).json({ message: "מוצר קיים אצל הלקוח." });

		user.productList.push(checkProductId);

		const isFound = user.productList.map(
			(product) => product.id.toString() === checkProductId
		);

		if (isFound) {
			await Product.findByIdAndUpdate(checkProductId, {
				place: ProductPlace.LOANED,
				loanDate: Date.now(),
				loanReturn: afterThreeMonth,
				loanBy: checkUserId,
			});
		} else {
			return res.status(501).json({ message: "ההשאלה נכשלה." });
		}

		//TODO: Change real email for user
		sendMail(
			"yakovaviel@outlook.co.il",
			`הושאל בהצלחה - ${product.productName}`,
			"https://YadLeyadid.com",
			"לצפייה בפרטי המוצר"
		);

		await user.save();

		return res.status(201).json({ message: "הושאל בהצלחה.", user });
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.addProductForUser2 = async (req, res) => {
	const userId = escape(req.params.user_id);
	const productsArr = req.body;
	let singleProduct = "";
	let manyProductsIds = [];
	let user;

	try {
		const checkUserId = validation.addSlashes(userId);

		const afterThreeMonth = new Date();
		afterThreeMonth.setMonth(afterThreeMonth.getMonth() + 3);

		user = await User.findById(checkUserId);

		if (!user) return res.status(404).json({ message: "לקוח לא קיים." });

		if (productsArr.ids.length === 1) {
			singleProduct = escape(productsArr.ids[0]);

			const product = await Product.findById(singleProduct);

			if (!product)
				return res.status(404).json({ message: "מוצר לא קיים." });

			if (product.place !== ProductPlace.IN_STOCK) {
				return res.status(400).json({ message: "מוצר לא זמין." });
			}

			const productExist = user.productList.find(
				(id) => id.toString() === singleProduct
			);
			if (productExist) {
				return res
					.status(400)
					.json({ message: "מוצר קיים אצל הלקוח." });
			}

			if (!product.inCategory) {
				return res
					.status(400)
					.json({
						message: "יש לשייך את המוצר לקטגוריה לפני ההשאלה ללקוח",
					});
			}
			user.productList.push(singleProduct);

			const isFound = user.productList.map(
				(product) => product.id.toString() === singleProduct
			);

			if (isFound) {
				await Product.findByIdAndUpdate(singleProduct, {
					place: ProductPlace.LOANED,
					loanDate: Date.now(),
					loanReturn: afterThreeMonth,
					loanBy: checkUserId,
				});
			} else {
				return res.status(501).json({ message: "ההשאלה נכשלה." });
			}

			//TODO: Change real email for user
			// sendMail(
			// 	"yakovaviel@outlook.co.il",
			// 	`הושאל בהצלחה - ${product.productName}`,
			// 	"https://YadLeyadid.com",
			// 	"לצפייה בפרטי המוצר"
			// );

			await user.save();

			return res.status(201).json({ message: "הושאל בהצלחה.", user });
		} else {
			for (const i in productsArr.ids) {
				manyProductsIds.push(escape(productsArr.ids[i]));
			}
			// ["1","2","3"]
			manyProductsIds.forEach(async (productId) => {
				const product = await Product.findById(productId); // "1"
				if (!product)
					return res.status(404).json({ message: "מוצר לא קיים." });

				if (product.place !== ProductPlace.IN_STOCK) {
					return res.status(400).json({ message: "מוצר לא זמין." });
				}

				const productExist = user.productList.find(
					(id) => id.toString() === productId
				);

				if (!product.inCategory) {
					return res
						.status(400)
						.json({
							message:
								"יש לשייך את המוצר לקטגוריה לפני ההשאלה ללקוח",
						});
				}

				if (productExist) {
					return res
						.status(400)
						.json({ message: "מוצר קיים אצל הלקוח." });
				}

				user.productList.push(productId);

				const isFound = user.productList.map(
					(product) => product.id.toString() === productId
				);

				if (isFound) {
					await Product.findByIdAndUpdate(productId, {
						place: ProductPlace.LOANED,
						loanDate: Date.now(),
						loanReturn: afterThreeMonth,
						loanBy: checkUserId,
					});
				} else {
					return res.status(501).json({ message: "ההשאלה נכשלה." });
				}

				//TODO: Change real email for user
				// sendMail(
				// 	"yakovaviel@outlook.co.il",
				// 	`הושאל בהצלחה - ${product.productName}`,
				// 	"https://YadLeyadid.com",
				// 	"לצפייה בפרטי המוצר"
				// );

				await user.save();
			});
			return res.status(201).json({ message: "הושאל בהצלחה.", user });
		}
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.deleteProductUser = async (req, res) => {
	const userId = escape(req.params.user_id);
	const productId = escape(req.params.product_id);
	try {
		const checkUserId = validation.addSlashes(userId);
		const checkProductId = validation.addSlashes(productId);

		const user = await User.findById(checkUserId);
		if (!user) return res.status(400).json({ message: "לקוח לא קיים." });

		const productExist = user.productList.find(
			(id) => id.toString() === checkProductId
		);
		if (!productExist) {
			return res.status(400).json({ message: "מוצר לא קיים אצל הלקוח." });
		} else user.productList.pull(checkProductId);

		console.log(user.productList);

		const isFound = user.productList.find(
			(product) => product.id.toString() === checkProductId
		);

		if (isFound) {
			return res.status(501).json({ message: "המחיקה נכשלה." });
		}

		await Product.findByIdAndUpdate(checkProductId, {
			place: ProductPlace.IN_STOCK,
			loanDate: null,
			loanReturn: null,
			loanBy: null,
		});
		await user.save();
		return res.status(200).json({ message: "נמחק בהצלחה.", user });
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.getUserProducts = async (req, res) => {
	const allProducts = [];
	const userProducts = [];
	const userId = escape(req.params.id);
	let user;
	try {
		const checkUserId = validation.addSlashes(userId);
		user = await User.findById(checkUserId);
		if (!user) {
			return res.status(404).json({ message: "לא קיים משתמש." });
		}

		const products = await Product.find();

		user.productList.forEach((e) => {
			allProducts.push(e.toString());
		});

		products.forEach((p) => {
			allProducts.forEach((u) => {
				if (p._id.toString() === u) {
					userProducts.push(p);
				}
			});
		});

		return res.status(200).json(userProducts);
	} catch (err) {
		return res.status(404).json({ message: err });
	}
};
