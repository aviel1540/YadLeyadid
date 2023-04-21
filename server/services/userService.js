const User = require("../models/User");

exports.checkUsername = async (username) =>
	await User.findOne({
		username: username,
	});
