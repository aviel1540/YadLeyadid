const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const escape = require("escape-html");
const validation = require("../utils/validation");
const { ProductPlace } = require("../constants/productPlace");
const userService = require("../services/userService");
const productService = require("../services/productService");
const mailer = require("../utils/mailer");

exports.register = async (req, res) => {
	const entityCard = escape(req.body.entityCard);
	const username = escape(req.body.username);
	const name = escape(req.body.name);
	const password = escape(req.body.password);
	const email = escape(req.body.email);
	const phoneNumber = escape(req.body.phoneNumber);
	const address = escape(req.body.address);
	const paymentType = escape(req.body.paymentType);
	const admin = escape(req.body.admin);

	let user;
	try {
		if (
			!entityCard ||
			!name ||
			!username ||
			!password ||
			!email ||
			!phoneNumber ||
			!address
		) {
			return res.status(400).json({ message: "נא למלא את כל השדות." });
		}

		if (!admin && (paymentType === "" || !paymentType)) {
			return res
				.status(400)
				.json({ message: "נא לבחור את אופן התשלום." });
		}
		if (!validation.iDValidator(entityCard)) {
			return res.status(400).json({ message: "תעודת זהות לא תקינה." });
		}

		if (!validation.checkEmail(email)) {
			return res.status(400).json({ message: "מייל לא תקין." });
		}

		if (!validation.phoneNumber(phoneNumber)) {
			return res.status(400).json({
				message: "מספר פלאפון צריך להכיל 10 ספרות בלבד.",
			});
		}
		if (!validation.checkName(name)) {
			return res.status(400).json({
				message: "שם צריך להכיל מינימום 2 תווים.",
			});
		}

		if (!validation.checkPassword(password)) {
			return res
				.status(400)
				.json({ message: "סיסמא צריכה להכיל מינימום 9 תווים." });
		}

		const checkEntityCard = validation.addSlashes(entityCard);
		const checkUsername = validation.addSlashes(username);
		const checkName = validation.addSlashes(name);
		const checkPassword = validation.addSlashes(password);
		const checkEmail = validation.addSlashes(email);
		const checkPhoneNumber = validation.addSlashes(phoneNumber);
		const checkAddress = validation.addSlashes(address);
		const userUsername = await userService.findByUsername(checkUsername);

		if (userUsername) {
			return res.status(400).json({ message: "שם משתמש קיים במערכת." });
		}

		const userEntityCard = await userService.findByEntityCard(
			checkEntityCard
		);

		if (userEntityCard) {
			return res
				.status(400)
				.json({ message: "תעודת זהות קיימת במערכת." });
		}

		const userEmail = await userService.findByEmail(checkEmail);
		if (userEmail) {
			return res.status(400).json({ message: "מייל קיים במערכת." });
		}

		const userPhoneNumber = await userService.findByPhoneNumber(
			checkPhoneNumber
		);
		if (userPhoneNumber) {
			return res
				.status(400)
				.json({ message: "מספר פלאפון קיים במערכת." });
		}

		const passwordHash = await auth.hashPassword(checkPassword);

		user = await userService.addUser({
			checkEntityCard,
			checkUsername,
			checkName,
			checkEmail,
			passwordHash,
			checkPhoneNumber,
			checkAddress,
			paymentType,
			admin,
		});

		await user.save();
		if (!user) {
			return res
				.status(500)
				.json({ message: "לא נוסף הלקוח, נא לנסות שוב." });
		}
		return res.status(201).json({
			message: user.isAdmin ? "מנהל נוסף בהצלחה." : "לקוח נוסף בהצלחה.",
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	const entityCard = escape(req.body.entityCard);
	const password = escape(req.body.password);

	try {
		if (!entityCard || !password) {
			return res.status(400).json({ message: "נא למלא את כל השדות." });
		}
		const checkEntityCard = validation.addSlashes(entityCard);
		const checkPassword = validation.addSlashes(password);

		const user = await auth.login(checkEntityCard, checkPassword);
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
		return res.status(500).json({ message: err });
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
		return res.status(500).json({ message: err });
	}
};

exports.getAllUsers = async (req, res) => {
	let users = [];
	let products = [];
	let details;
	let product;
	try {
		const result = await userService.allUsers();
		if (!result) {
			return res.status(404).json({ message: "מאגר משתמשים ריק" });
		}
		// const user = result.sort((a, b) => {
		// 	if (a.isAdmin && !b.isAdmin) {
		// 	  return -1; // a comes before b
		// 	} else if (!a.isAdmin && b.isAdmin) {
		// 	  return 1; // b comes before a
		// 	}
		// 	return 0; // no sorting needed
		//   });
		const user = result.filter((user) => !user.isAdmin);
		for (let i = 0; i < user.length; i++) {
			const userDetails = user[i];
			if (userDetails.productList.length > 0) {
				for (let k = 0; k < userDetails.productList.length; k++) {
					const productId = userDetails.productList[k];
					product = await productService.showProductDetailsInUser(
						productId
					);
					products.push(product);
				}
				details = {
					_id: userDetails._id,
					entityCard: userDetails.entityCard,
					name: userDetails.name,
					username: userDetails.username,
					email: userDetails.email,
					phoneNumber: userDetails.phoneNumber,
					address: userDetails.address,
					paymentType: userDetails.paymentType,
					createdAt: userDetails.createdAt,
					updatedAt: userDetails.updatedAt,
					isAdmin: userDetails.isAdmin,
					userProductList: products,
				};

				users.push(details);
				products = [];
			} else {
				details = {
					_id: userDetails._id,
					entityCard: userDetails.entityCard,
					name: userDetails.name,
					username: userDetails.username,
					email: userDetails.email,
					phoneNumber: userDetails.phoneNumber,
					address: userDetails.address,
					paymentType: userDetails.paymentType,
					createdAt: userDetails.createdAt,
					updatedAt: userDetails.updatedAt,
					isAdmin: userDetails.isAdmin,
				};
				users.push(details);
			}
		}
		return res.status(200).send(users);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.getAllAdmins = async (req, res) => {
	let users = [];
	let result;
	let details;
	try {
		result = await userService.allUsers();
		const admin = result.filter((user) => user.isAdmin);
		admin.map((user) => {
			details = {
				_id: user._id,
				entityCard: user.entityCard,
				name: user.name,
				username: user.username,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				paymentType: user.paymentType,
				isAdmin: user.isAdmin,
			};
			users.push(details);
		});
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getUserByUsername = async (req, res) => {
	const username = escape(req.params.username);
	let products = [];
	let details;
	let product;
	let user;
	try {
		const checkUsername = validation.addSlashes(username);
		user = await userService.findByUsername(checkUsername);
		if (!user) {
			return res.status(404).json({ message: "לא קיים משתמש." });
		}
		if (user.productList.length > 0) {
			for (let i = 0; i < user.productList.length; i++) {
				const productId = user.productList[i];
				product = await productService.showProductDetailsInUser(
					productId
				);
				products.push(product);
			}
			details = {
				_id: user._id,
				entityCard: user.entityCard,
				name: user.name,
				username: user.username,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				paymentType: user.paymentType,
				userProductList: products,
				createdAt: user.createdAt,
			};
		} else {
			details = {
				_id: user._id,
				entityCard: user.entityCard,
				name: user.name,
				username: user.username,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				paymentType: user.paymentType,
				createdAt: user.createdAt,
			};
		}
		return res.status(200).json(details);
	} catch (err) {
		return res.status(400).json({ message: err });
	}
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

		await userService.updateUserPassword(checkUserId, password);

		return res.status(200).json({ message: "עודכן בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.addProductForUser = async (req, res) => {
	const userId = escape(req.params.userId);
	const productsArr = req.body;
	let manyProductsIds = [];
	let user;

	try {
		const checkUserId = validation.addSlashes(userId);

		const afterThreeMonth = new Date();
		afterThreeMonth.setMonth(afterThreeMonth.getMonth() + 3);

		user = await userService.findUserById(checkUserId);

		if (!user) return res.status(404).json({ message: "לקוח לא קיים." });

		for (const i in productsArr.ids) {
			manyProductsIds.push(escape(productsArr.ids[i]));
		}
		const products = manyProductsIds.map(async (productId) => {
			const product = await productService.findProductById(productId); // "1"
			if (!product)
				return res.status(404).json({ message: "מוצר לא קיים." });

			if (product.place !== ProductPlace.IN_STOCK) {
				return res.status(404).json({ message: "מוצר לא זמין." });
			}

			const productExist = user.productList.find(
				(id) => id.toString() === productId
			);

			if (productExist) {
				return res
					.status(400)
					.json({ message: "מוצר קיים אצל הלקוח." });
			}
			if (!product.inCategory) {
				return res.status(400).json({
					message: "יש לשייך את המוצר לקטגוריה לפני ההשאלה ללקוח",
				});
			}

			user.productList.push(productId);

			const isFound = user.productList.map(
				(product) => product.id.toString() === productId
			);

			if (isFound) {
				await productService.updateProductAssignToUser({
					productId,
					afterThreeMonth,
					checkUserId,
				});
			} else {
				return res.status(501).json({ message: "ההשאלה נכשלה." });
			}
		});

		await Promise.all(products);

		await user.save();
		mailer.sendMailFunc(user.email, "המוצרים הושאלו בהצלחה");
		return res.status(201).json({ message: "הושאל בהצלחה.", user });
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.unassignProductUser = async (req, res) => {
	const userId = escape(req.params.userId);
	const productId = escape(req.params.productId);
	try {
		const checkUserId = validation.addSlashes(userId);
		const checkProductId = validation.addSlashes(productId);

		const user = await userService.findUserById(checkUserId);
		if (!user) return res.status(400).json({ message: "לקוח לא קיים." });

		const productExist = user.productList.find(
			(id) => id.toString() === checkProductId
		);

		if (!productExist) {
			return res.status(400).json({ message: "מוצר לא קיים אצל הלקוח." });
		} else user.productList.pull(checkProductId);

		const isFound = user.productList.find(
			(product) => product.id.toString() === checkProductId
		);

		if (isFound) {
			return res.status(501).json({ message: "המחיקה נכשלה." });
		}

		await productService.updateProductUnassignToUser(checkProductId);
		await user.save();
		return res.status(200).json({ message: "השיוך הוסר בהצלחה." });
	} catch (err) {
		return res.status(401).json({ message: err.message });
	}
};

exports.updateDetails = async (req, res) => {
	const userId = escape(req.params.id);
	const entityCard = escape(req.body.entityCard);
	const username = escape(req.body.username);
	const name = escape(req.body.name);
	const email = escape(req.body.email);
	const phoneNumber = escape(req.body.phoneNumber);
	const address = escape(req.body.address);
	const paymentType = escape(req.body.paymentType);
	const admin = escape(req.body.admin);
	let updateUser;

	try {
		if (
			!entityCard ||
			!username ||
			!name ||
			!email ||
			!phoneNumber ||
			!address ||
			!paymentType ||
			!admin
		) {
			return res.status(400).json({ message: "נא למלא את כל השדות." });
		}
		if (!validation.iDValidator(entityCard)) {
			return res.status(400).json({ message: "תעודת זהות לא תקינה." });
		}
		if (!validation.phoneNumber(phoneNumber)) {
			return res.status(400).json({
				message: "מספר פלאפון צריך להכיל 10 ספרות בלבד.",
			});
		}
		if (!validation.checkName(name)) {
			return res.status(400).json({
				message: "שם צריך להכיל מינימום 2 תווים.",
			});
		}

		if (!validation.checkEmail(email)) {
			return res.status(400).json({ message: "מייל לא תקין." });
		}

		const checkUserId = validation.addSlashes(userId);
		const checkEntityCard = validation.addSlashes(entityCard);
		const checkUserName = validation.addSlashes(username);
		const checkName = validation.addSlashes(name);
		const checkEmail = validation.addSlashes(email);
		const checkPhoneNumber = validation.addSlashes(phoneNumber);
		const checkAddress = validation.addSlashes(address);

		const userEntityCard = await userService.findByEntityCard(
			checkEntityCard
		);

		if (userEntityCard?.entityCard !== checkEntityCard && userEntityCard) {
			return res
				.status(400)
				.json({ message: "תעודת זהות קיימת במערכת." });
		}

		const userUserName = await userService.findByUsername(checkUserName);

		if (userUserName?.username !== checkUserName && userUserName) {
			return res.status(400).json({ message: "שם המשתמש קיים במערכת." });
		}

		const userEmail = await userService.findByEmail(checkEmail);

		if (userEmail?.email !== checkEmail && userEmail) {
			return res.status(400).json({ message: "מייל קיים במערכת." });
		}

		const userPhoneNumber = await userService.findByPhoneNumber(
			checkPhoneNumber
		);

		if (
			userPhoneNumber?.phoneNumber !== checkPhoneNumber &&
			userPhoneNumber
		) {
			return res
				.status(400)
				.json({ message: "מספר פלאפון קיים במערכת." });
		}

		updateUser = await userService.updateUserDetails({
			checkUserId,
			checkEntityCard,
			checkUserName,
			checkName,
			checkEmail,
			checkPhoneNumber,
			checkAddress,
			paymentType,
			admin,
		});

		if (!updateUser)
			return res
				.status(400)
				.json({ message: "העידכון נכשל, נא לנסות שוב." });
		await updateUser.save();

		return res.status(200).json({
			message: updateUser.isAdmin
				? "המנהל התעדכן בהצלחה."
				: "הלקוח התעדכן בהצלחה.",
		});
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};

exports.checkEmailForChangePass = async (req, res) => {
	const email = escape(req.body.email);
	try {
		const number = Math.floor(Math.random() * 10000) + 1000;
		console.log(number);
	} catch (err) {}
};
