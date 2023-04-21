const User = require("../models/User");

exports.checkUsername = async (username) => await User.findOne({ username });

exports.checkIdTeuda = async (idTeuda) => await User.findOne({ idTeuda });

exports.checkEmail = async (email) => await User.findOne({ email });

exports.checkPhoneNumber = async (phoneNumber) => await User.findOne({ phoneNumber });


exports.addUser = async (request) => {
	const { checkIdTeuda, checkUsername, checkName, checkEmail, passwordHash, checkPhoneNumber, checkAddress, checkPaymentType } = request;

	return new User({
		idTeuda: checkIdTeuda,
		username: checkUsername,
		name: checkName,
		password: passwordHash,
		email: checkEmail,
		phoneNumber: checkPhoneNumber,
		address: checkAddress,
		paymentType: checkPaymentType
	});
};