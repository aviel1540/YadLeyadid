const User = require("../models/User");

exports.allUsers = async () => await User.find();

exports.findUserById = async (userId) => await User.findById(userId);

exports.findByUsername = async (username) => await User.findOne({ username });

exports.findPasswordResetToken = async (passwordResetToken) =>
	await User.findOne({
		passwordResetToken,
		passwordResetExpires: { $gt: Date.now() },
	});

exports.findByEntityCard = async (entityCard) =>
	await User.findOne({ entityCard });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.findByPhoneNumber = async (phoneNumber) =>
	await User.findOne({ phoneNumber });

exports.addUser = async (request) =>
	new User({
		entityCard: request.checkEntityCard,
		username: request.checkUsername,
		name: request.checkName,
		password: request.passwordHash,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.paymentType ? request.paymentType : null,
		isAdmin: request.admin,
	});

exports.deleteUser = async (userId) => await User.findByIdAndRemove(userId);

exports.updateUserPassword = async (userId, password) =>
	await User.findByIdAndUpdate(userId, { password });

exports.updatePasswordResetToken = async (userId) =>
	await User.findByIdAndUpdate(userId, {
		passwordResetToken: null,
		passwordResetExpires: null,
	});

exports.updateUserDetails = async (request) =>
	await User.findByIdAndUpdate(request.checkUserId, {
		entityCard: request.checkEntityCard,
		username: request.checkUserName,
		name: request.checkName,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.paymentType ? request.paymentType : null,
		isAdmin: request.admin,
	});

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
