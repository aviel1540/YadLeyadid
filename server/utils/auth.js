const bcrypt = require("bcrypt");
const { findByEntityCard } = require("../services/userService");

exports.hashPassword = async (value) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(value, salt);
};

exports.login = async (entityCard, password) => {
	try {
		const user = await findByEntityCard(entityCard);
		if (user) {
			const isMatch = await this.comparePassword(password, user?.password);

			return isMatch ? user : false;
		}
		return false;
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

exports.comparePassword = async (password,userPassword) => await bcrypt.compare(password, userPassword);

