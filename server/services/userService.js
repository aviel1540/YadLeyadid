const User = require("../models/User");

exports.allUsers = async () => await User.find();

exports.findUserById = async (userId) => await User.findById(userId);

exports.findByUsername = async (username) => await User.findOne({ username });

exports.findByEntityCard = async (entityCard) =>
	await User.findOne({ entityCard });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.findByPhoneNumber = async (phoneNumber) =>
	await User.findOne({ phoneNumber });

exports.addUser = async (request) => {
	return new User({
		entityCard: request.checkEntityCard,
		username: request.checkUsername,
		name: request.checkName,
		password: request.passwordHash,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.checkPaymentType,
	});
};

exports.deleteUser = async (userId) => await User.findByIdAndRemove(userId);

exports.updateUserPassword = async (userId, password) =>
	await User.findByIdAndUpdate(userId, { password });

exports.updateUserDetails = async (request) => {
	return await User.findByIdAndUpdate(request.checkUserId, {
		entityCard: request.checkEntityCard,
		username: request.checkUserName,
		name: request.checkName,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.checkPaymentType,
		isAdmin: request.admin
	});
};

exports.userDetails = async (userId) => {
	const user = await this.findUserById(userId);
	return {
		username: user.username,
		entityCard: user.entityCard,
		email: user.email,
		phoneNumber: user.phoneNumber,
		address: user.address,
		name: user.name,
	};
};
