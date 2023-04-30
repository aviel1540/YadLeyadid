const User = require("../models/User");

exports.findByUsername = async (username) => await User.findOne({ username });

exports.findByIdTeuda = async (idTeuda) => await User.findOne({ idTeuda });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.findByPhoneNumber = async (phoneNumber) =>
  await User.findOne({ phoneNumber });

exports.addUser = async (request) => {
  const {
    checkIdTeuda,
    checkUsername,
    checkName,
    checkEmail,
    passwordHash,
    checkPhoneNumber,
    checkAddress,
    checkPaymentType,
  } = request;

  return new User({
    idTeuda: checkIdTeuda,
    username: checkUsername,
    name: checkName,
    password: passwordHash,
    email: checkEmail,
    phoneNumber: checkPhoneNumber,
    address: checkAddress,
    paymentType: checkPaymentType,
  });
};

exports.findUserById = async (checkUserId) => await User.findById(checkUserId);

exports.deleteUser = async (checkUserId) =>
  await User.findByIdAndRemove({ checkUserId });

exports.allUsers = async () => await User.find();

exports.updateUserPassword = async (checkUserId, password) =>
  await User.findByIdAndUpdate(checkUserId, { password });

exports.updateUserDetails = async (request) => {
  console.log("eeeeee");

  const {
    checkUserId,
    checkIdTeuda,
    checkUsername,
    checkName,
    checkEmail,
    checkPhoneNumber,
    checkAddress,
    checkPaymentType,
  } = request;
  console.log(await User.findByIdAndUpdate(checkUserId, {
    idTeuda: checkIdTeuda,
    username: checkUsername,
    name: checkName,
    email: checkEmail,
    phoneNumber: checkPhoneNumber,
    address: checkAddress,
    paymentType: checkPaymentType,
  }));

  return await User.findByIdAndUpdate(checkUserId, {
    idTeuda: checkIdTeuda,
    username: checkUsername,
    name: checkName,
    email: checkEmail,
    phoneNumber: checkPhoneNumber,
    address: checkAddress,
    paymentType: checkPaymentType,
  });
};
