const jwt = require('jsonwebtoken');
const User = require("../models/User");
const auth = require("../utils/auth/auth");
const escape = require("escape-html");
const {
	addSlashes,
	validateEmail,
	isLengthUsername,
	isLengthPassword,
} = require("../utils/validation/validation");

const maxAge = 24*60*60; //1 day in seconds

const userCtrl = {
	//add new user controller
	register: async (req, res) => {
		const idTeuda = escape(req.body.idTeuda);
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
				!password ||
				!email ||
				!phoneNumber ||
				!address ||
				!paymentType
			) {
				return res
					.status(400)
					.json({ message: "Please fill in all fields" });
			}
			if (!validateEmail(email)) {
				return res.status(400).json({ message: "Invalid email" });
			}

			if (!isLengthUsername(name)) {
				return res.status(400).json({
					message: "Username must be at least 2 characters",
				});
			}

			if (!isLengthPassword(password)) {
				return res.status(400).json({
					message: "Password must be at least 6 characters",
				});
			}

			const checkIdTeuda = addSlashes(idTeuda);
			const checkName = addSlashes(name);
			const checkPassword = addSlashes(password);
			const checkEmail = addSlashes(email);
			const checkPhoneNumber = addSlashes(phoneNumber);
			const checkAddress = addSlashes(address);
			const checkPaymentType = addSlashes(paymentType);

			const userIdTeuda = await User.findOne({ idTeuda: checkIdTeuda });

			if (userIdTeuda) {
				return res
					.status(400)
					.json({ message: "This Id already exists" });
			}

			const userEmail = await User.findOne({ email: checkEmail });
			if (userEmail) {
				return res
					.status(400)
					.json({ message: "This Email already exists" });
			}

			const userPhoneNumber = await User.findOne({
				phoneNumber: checkPhoneNumber,
			});
			if (userPhoneNumber) {
				return res
					.status(400)
					.json({ message: "This PhoneNumber already exists" });
			}

			const passwordHash = await auth.hashPassword(checkPassword);

			user = new User({
				idTeuda: checkIdTeuda,
				name: checkName,
				email: checkEmail,
				password: passwordHash,
				phoneNumber: checkPhoneNumber,
				address: checkAddress,
				paymentType: checkPaymentType,
			});

			await user.save();
		} catch (err) {
			return res.status(401).json({ message: err.message });
		}
		if (!user) {
			return res.status(500).json({ message: "Unable to add" });
		}
		return res.status(201).json({ user });
	},
	//delete user controller
	deleteUser: async (req, res) => {
		const id = req.params.id;
		try {
			const userResult = await User.findByIdAndDelete(id);
			if (userResult == null) {
				return res.status(404).send("No User Were Found !");
			}
			res.status(200).send(userResult.name + " deleted successfully !");
		} catch (err) {
			res.status(404).send(err);
		}
	},

	//show all users
	showAllUsers: async (req, res) => {
		try {
			let Users = await User.find();
			res.status(201).send(Users);
		} catch (err) {
			res.status(400).send(err);
		}
	},
	//search user by id
	searchUser: async (req, res) => {
		let userSearch = await User.findById(req.params.id);
		try {
			if (!userSearch) return res.status(400).send("No User Found !");
			res.status(200).send(userSearch);
		} catch (err) {
			res.status(400).send(err);
		}
	},
	//update user detailes
	updateUser: async (req, res) => {},
	//add product to user

	//remove product from user

	//user login
	loginUser: async(req, res) => {
		const { idTeuda, password } = req.body;
		try {
			const user = await auth.login(idTeuda, password);
			const token = jwt.sign({
				id: user._id,
				idTeuda: user.idTeuda,
				name: user.name,
				password: user.password,
				email: user.email,
				phoneNumber: user.phoneNumber,
				address: user.address,
				paymentType: user.paymentType
			}, process.env.SECRET, {expiresIn: maxAge});
			res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
			res.status(200).json({user});
		} catch(err) {
			console.log(err);
			res.status(400).send(err);
		}
	}
};

module.exports = userCtrl;
