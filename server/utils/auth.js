const bcrypt = require("bcrypt");
const User = require("../models/User");
const { findByEntityCard } = require("../services/userService");

exports.hashPassword = async (value) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(value, salt);
};

exports.login = async (entityCard, password) => {
	try {
		const user = await findByEntityCard(entityCard);
		if (user) {
			const isMatch = await bcrypt.compare(password, user?.password);

			if (!isMatch) return false;

			return user;
		}
		return false;
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};
