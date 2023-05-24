const User = require("../models/User");

exports.findByUsername = async (username) => await User.findOne({ username });

exports.findByIdTeuda = async (idTeuda) => await User.findOne({ idTeuda });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.findByPhoneNumber = async (phoneNumber) =>
	await User.findOne({ phoneNumber });

exports.addUser = async (request) => {
	return new User({
		idTeuda: request.checkIdTeuda,
		username: request.checkUsername,
		name: request.checkName,
		password: request.passwordHash,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.checkPaymentType,
	});
};

exports.findUserById = async (checkUserId) => await User.findById(checkUserId);

exports.deleteUser = async (checkUserId) =>
	await User.findByIdAndRemove(checkUserId);

exports.allUsers = async () => await User.find();

exports.updateUserPassword = async (checkUserId, password) =>
	await User.findByIdAndUpdate(checkUserId, { password });

exports.updateUserDetails = async (request) => {
	return await User.findByIdAndUpdate(request.checkUserId, {
		idTeuda: request.checkIdTeuda,
		name: request.checkName,
		email: request.checkEmail,
		phoneNumber: request.checkPhoneNumber,
		address: request.checkAddress,
		paymentType: request.checkPaymentType,
	});
};

exports.showUserDetailsInProducts = async (userId) => {
	const user = await User.findById(userId);
	return {
		username: user.username,
		idTeuda: user.idTeuda,
		email: user.email,
		phoneNumber: user.phoneNumber,
		address: user.address,
		name: user.name,
	};
};

exports.findByIdTeudaForUpdate = async (userId, idTeuda) => {
	const user = await User.findOne({ idTeuda });
	if (!user) return false;
	if (user.id === userId) return false;
	return true;
};

exports.findByEmailForUpdate = async (userId, email) => {
	const user = await User.findOne({ email });
	if (!user) return false;
	if (user.id === userId) return false;
	return true;
};
exports.findByPhoneNumberForUpdate = async (userId, phoneNumber) => {
	const user = await User.findOne({ phoneNumber });
	if (!user) return false;
	if (user.id === userId) return false;
	return true;
};
