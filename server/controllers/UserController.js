const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Category = require('../models/Category');
const auth = require("../utils/auth/auth");
const escape = require("escape-html");
const {
  addSlashes,
  validateEmail,
  isLengthUsername,
  isLengthPassword,
} = require("../utils/validation/validation");

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
        return res.status(400).json({ message: "נא למלא את כל השדות" });
      }
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "מייל לא תקין" });
      }

      if (!isLengthUsername(name)) {
        return res.status(400).json({
          message: "שם צריך להכיל מינימום 2 תווים",
        });
      }

      if (!isLengthPassword(password)) {
        return res
          .status(400)
          .json({ message: "סיסמא צריכה להכיל מינימום 9 תווים" });
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
        return res.status(400).json({ message: "תעודת זהות כבר קיימת" });
      }

      const userEmail = await User.findOne({ email: checkEmail });
      if (userEmail) {
        return res.status(400).json({ message: "מייל כבר קיים" });
      }

      const userPhoneNumber = await User.findOne({
        phoneNumber: checkPhoneNumber,
      });
      if (userPhoneNumber) {
        return res.status(400).json({ message: "מספר פלאפון כבר קיים" });
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
      return res.status(500).json({ message: "לא נוסף המשתמש" });
    }
    return res.status(201).json(user);
  },
  //user login By Or
  loginUser: async (req, res) => {
    const idTeuda = escape(req.body.idTeuda);
    const password = escape(req.body.password);

    try {
      if (!idTeuda || !password) {
        return res.status(400).json({ message: "נא למלא את כל השדות" });
      }
      const checkIdTeuda = addSlashes(idTeuda);
      const checkPassword = addSlashes(password);

      const user = auth.login(checkIdTeuda, checkPassword);
      const token = jwt.sign(
        {
          id: user._id,
          idTeuda: user.idTeuda,
          name: user.name,
          password: user.password,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          paymentType: user.paymentType,
        },
        process.env.SECRET
      );

      return res.status(200).json(token);
    } catch (err) {
      return res.status(404).json({ message: err });
    }
  },
  //delete user controller By Or
  deleteUser: async (req, res) => {
    const userId = escape(req.params.id);
    let user;
    try {
      const checkUserId = addSlashes(userId);

      user = await User.findByIdAndRemove(checkUserId);
    } catch (err) {
      return res.status(404).json({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "לא קיים משתמש" });
    }
    return res.status(200).json({ message: "המשתמש נמחק בהצלחה" });
  },
  //show all users By Or
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).send(users);
    } catch (err) {
      return res.status(404).json({ message: err });
    }
  },
  //get user by id By Or
  getUserById: async (req, res) => {
    const userId = escape(req.params.id);
    let user;
    try {
      const checkUserId = addSlashes(userId);

      user = await User.findById({ checkUserId });
    } catch (err) {
      return res.status(404).json({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "לא קיים משתמש" });
    }
    return res.status(200).json(user);
  },
  //updatePassword user By Or
  updatePassword: async (req, res) => {
    const userId = escape(req.params.id);
    const newPassword = escape(req.body.password);

    if (isLengthPassword(newPassword)) {
      return res
        .status(400)
        .json({ message: "סיסמא צריכה להכיל מינימום 9 תווים" });
    }
    try {
      const password = auth.hashPassword(newPassword);

      const checkUserId = addSlashes(userId);

      await User.findByIdAndUpdate(checkUserId, { password });

      return res.status(200).json({ message: "עודכן בהצלחה" });
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
  //add product to user
  addProductUser: async(req,res) => {
    const userId = escape(req.params.user_id);
    const productId = escape(req.params.product_id);
    try {
      const user = await User.findById(userId);
      // const product = await Product.findById(productId);
      if(!user)
      return res
            .status(400)
            .json({message : "לקוח לא קיים "});
      
      if(!product)
      return res
            .status(400)
            .json({message : "מוצר לא קיים "});

      
      
    } catch(err) {

    }
  }
  //remove product from user
};

module.exports = userCtrl;
