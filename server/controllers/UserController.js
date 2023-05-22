const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const escape = require("escape-html");
const validation = require("../utils/validation");
const { ProductPlace } = require("../constants/productPlace");
const userService = require("../services/userService");
const productService = require("../services/productService");
const mailer = require("../utils/mailer");

exports.register = async (req, res) => {
  const idTeuda = escape(req.body.idTeuda);
  const username = escape(req.body.username);
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
      !username ||
      !password ||
      !email ||
      !phoneNumber ||
      !address ||
      !paymentType
    ) {
      return res.status(400).json({ message: "נא למלא את כל השדות." });
    }
    if (!validation.iDValidator(idTeuda)) {
      return res.status(400).json({ message: "תעודת זהות לא תקינה." });
    }

    if (!validation.checkEmail(email)) {
      return res.status(400).json({ message: "מייל לא תקין." });
    }

    if (!validation.checkName(name)) {
      return res.status(400).json({
        message: "שם צריך להכיל מינימום 2 תווים.",
      });
    }

    if (!validation.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: "סיסמא צריכה להכיל מינימום 9 תווים." });
    }

    const checkIdTeuda = validation.addSlashes(idTeuda);
    const checkUsername = validation.addSlashes(username);
    const checkName = validation.addSlashes(name);
    const checkPassword = validation.addSlashes(password);
    const checkEmail = validation.addSlashes(email);
    const checkPhoneNumber = validation.addSlashes(phoneNumber);
    const checkAddress = validation.addSlashes(address);
    const checkPaymentType = validation.addSlashes(paymentType);

    const userUsername = await userService.findByUsername(checkUsername);

    if (userUsername) {
      return res.status(400).json({ message: "שם משתמש קיים במערכת." });
    }

    const userIdTeuda = await userService.findByIdTeuda(checkIdTeuda);

    if (userIdTeuda) {
      return res.status(400).json({ message: "תעודת זהות קיימת במערכת." });
    }

    const userEmail = await userService.findByEmail(checkEmail);
    if (userEmail) {
      return res.status(400).json({ message: "מייל קיים במערכת." });
    }

    const userPhoneNumber = await userService.findByPhoneNumber(
      checkPhoneNumber
    );
    if (userPhoneNumber) {
      return res.status(400).json({ message: "מספר פלאפון קיים במערכת." });
    }

    const passwordHash = await auth.hashPassword(checkPassword);

    user = await userService.addUser({
      checkIdTeuda,
      checkUsername,
      checkName,
      checkEmail,
      passwordHash,
      checkPhoneNumber,
      checkAddress,
      checkPaymentType,
    });

    await user.save();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  if (!user) {
    return res.status(500).json({ message: "לא נוסף הלקוח, נא לנסות שוב." });
  }
  return res.status(201).json({ message: "לקוח נוסף בהצלחה." });
};

exports.login = async (req, res) => {
  const idTeuda = escape(req.body.idTeuda);
  const password = escape(req.body.password);

  try {
    if (!idTeuda || !password) {
      return res.status(400).json({ message: "נא למלא את כל השדות." });
    }
    const checkIdTeuda = validation.addSlashes(idTeuda);
    const checkPassword = validation.addSlashes(password);

    const user = await auth.login(checkIdTeuda, checkPassword);
    if (!user) {
      return res.status(400).json({ message: "שם משתמש או סיסמא שגויים." });
    }
    const token = jwt.sign(
      {
        username: user.username,
        name: user.name,
        isAdmin: user.isAdmin,
      },
      process.env.ACTIVATION_TOKEN_SECRET
    );

    return res.status(200).json(token);
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = escape(req.params.id);
  let user;
  try {
    const checkUserId = validation.addSlashes(userId);

    user = await userService.findUserById(checkUserId);

    if (!user) return res.status(404).json({ message: "לא קיים משתמש." });

    if (user.productList.length > 0) {
      return res
        .status(401)
        .json({ message: "לא ניתן למחוק, קיימים מוצרים ללקוח." });
    }

    user = await userService.deleteUser(checkUserId);

    return res.status(200).json({ message: "המשתמש נמחק בהצלחה." });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.getAllUsers = async (req, res) => {
  let users = [];
  let products = [];
  let details;
  let product;
  try {
    const user = await userService.allUsers();
    if (!user) {
      return res.status(404).json({ message: "מאגר משתמשים ריק" });
    }
    for (let i = 0; i < user.length; i++) {
      const userDetails = user[i];
      if (userDetails.productList.length > 0) {
        for (let k = 0; k < userDetails.productList.length; k++) {
          const productId = userDetails.productList[k];
          product = await productService.showProductDetailsInUser(productId);
          products.push(product);
        }
        details = {
          _id: userDetails._id,
          idTeuda: userDetails.idTeuda,
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          address: userDetails.address,
          paymentType: userDetails.paymentType,
          userProductList: products,
        };
        users.push(details);
        products = [];
      } else {
        details = {
          _id: userDetails._id,
          idTeuda: userDetails.idTeuda,
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          address: userDetails.address,
          paymentType: userDetails.paymentType,
        };
        users.push(details);
      }
    }
    return res.status(200).send(users);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.getUserByUsername = async (req, res) => {
  const username = escape(req.params.username);
  let products = [];
  let details;
  let product;
  let user;
  try {
    const checkUsername = validation.addSlashes(username);
    user = await userService.findByUsername(checkUsername);
    if (!user) {
      return res.status(404).json({ message: "לא קיים משתמש." });
    }
    if (user.productList.length > 0) {
      for (let i = 0; i < user.productList.length; i++) {
        const productId = user.productList[i];
        product = await productService.showProductDetailsInUser(productId);
        products.push(product);
      }
      details = {
        _id: user._id,
        idTeuda: user.idTeuda,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        paymentType: user.paymentType,
        userProductList: products,
      };
    } else {
      details = {
        _id: user._id,
        idTeuda: user.idTeuda,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        paymentType: user.paymentType,
      };
    }
    return res.status(200).json(details);
  } catch (err) {
    return res.status(400).json({ message: err });
  }

};

exports.getUserById = async (req, res) => {
  const userId = escape(req.params.id);

  let user;
  try {
    const checkUserId = validation.addSlashes(userId);

    user = await userService.findUserById(checkUserId);

    if (!user) {
      return res.status(404).json({ message: "לא קיים משתמש." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = escape(req.params.id);
  const newPassword = escape(req.body.password);

  try {
    if (!validation.checkPassword(newPassword)) {
      return res
        .status(400)
        .json({ message: "סיסמא צריכה להכיל מינימום 9 תווים." });
    }

    const checkUserId = validation.addSlashes(userId);
    const password = await auth.hashPassword(newPassword);

    await userService.updateUserPassword(checkUserId, password);

    return res.status(200).json({ message: "עודכן בהצלחה." });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

exports.addProductForUser = async (req, res) => {
  const userId = escape(req.params.user_id);
  const productsArr = req.body;
  let manyProductsIds = [];
  let user;

  try {
    const checkUserId = validation.addSlashes(userId);

    const afterThreeMonth = new Date();
    afterThreeMonth.setMonth(afterThreeMonth.getMonth() + 3);

    user = await userService.findUserById(checkUserId);

    if (!user) return res.status(404).json({ message: "לקוח לא קיים." });

    for (const i in productsArr.ids) {
      manyProductsIds.push(escape(productsArr.ids[i]));
    }
    const products = manyProductsIds.map(async (productId) => {
      const product = await productService.findProductById(productId); // "1"
      if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

      if (product.place !== ProductPlace.IN_STOCK) {
        return res.status(400).json({ message: "מוצר לא זמין." });
      }

      const productExist = user.productList.find(
        (id) => id.toString() === productId
      );

      if (productExist) {
        return res.status(400).json({ message: "מוצר קיים אצל הלקוח." });
      }
      if (!product.inCategory) {
        return res.status(400).json({
          message: "יש לשייך את המוצר לקטגוריה לפני ההשאלה ללקוח",
        });
      }

      user.productList.push(productId);

      const isFound = user.productList.map(
        (product) => product.id.toString() === productId
      );

      if (isFound) {
        await productService.updateProductAssignToUser({
          productId,
          afterThreeMonth,
          checkUserId,
        });
      } else {
        return res.status(501).json({ message: "ההשאלה נכשלה." });
      }
    });

    await Promise.all(products);

    await user.save();
    mailer.sendMailFunc(
      user.email,
      "המוצרים הושאלו בהצלחה"
    );
    return res.status(201).json({ message: "הושאל בהצלחה.", user });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

exports.unassignProductUser = async (req, res) => {
  const userId = escape(req.params.user_id);
  const productId = escape(req.params.product_id);
  try {
    const checkUserId = validation.addSlashes(userId);
    const checkProductId = validation.addSlashes(productId);

    const user = await userService.findUserById(checkUserId);
    if (!user) return res.status(400).json({ message: "לקוח לא קיים." });

    const productExist = user.productList.find(
      (id) => id.toString() === checkProductId
    );

    if (!productExist) {
      return res.status(400).json({ message: "מוצר לא קיים אצל הלקוח." });
    } else user.productList.pull(checkProductId);

    const isFound = user.productList.find(
      (product) => product.id.toString() === checkProductId
    );

    if (isFound) {
      return res.status(501).json({ message: "המחיקה נכשלה." });
    }

    await productService.updateProductUnassignToUser(checkProductId);
    await user.save();
    const product = await productService.findProductById(checkProductId);
    mailer.sendMailFunc(
      user.email,
      `המוצר - ${product.productName} הוחזר בהצלחה`
    )
    return res.status(200).json({ message: "נמחק בהצלחה.", user });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

exports.updateDetails = async (req, res) => {
  const userId = escape(req.params.id);
  const idTeuda = escape(req.body.idTeuda);
  const name = escape(req.body.name);
  const email = escape(req.body.email);
  const phoneNumber = escape(req.body.phoneNumber);
  const address = escape(req.body.address);
  const paymentType = escape(req.body.paymentType);
  let updateUser;
  try {
    if (
      !idTeuda ||
      !name ||
      !email ||
      !phoneNumber ||
      !address ||
      !paymentType
    ) {
      return res.status(400).json({ message: "נא למלא את כל השדות." });
    }
    if (!validation.iDValidator(idTeuda)) {
      return res.status(400).json({ message: "תעודת זהות לא תקינה." });
    }

    if (!validation.checkEmail(email)) {
      return res.status(400).json({ message: "מייל לא תקין." });
    }

    const checkUserId = validation.addSlashes(userId);
    const checkIdTeuda = validation.addSlashes(idTeuda);
    const checkName = validation.addSlashes(name);
    const checkEmail = validation.addSlashes(email);
    const checkPhoneNumber = validation.addSlashes(phoneNumber);
    const checkAddress = validation.addSlashes(address);
    const checkPaymentType = validation.addSlashes(paymentType);

    const userIdTeuda = await userService.findByIdTeudaForUpdate(
      checkUserId,
      checkIdTeuda
    );

    if (userIdTeuda) {
      return res.status(400).json({ message: "תעודת זהות קיימת במערכת." });
    }

    const userEmail = await userService.findByEmailForUpdate(
      checkUserId,
      checkEmail
    );
    if (userEmail) {
      return res.status(400).json({ message: "מייל קיים במערכת." });
    }

    const userPhoneNumber = await userService.findByPhoneNumberForUpdate(
      checkUserId,
      checkPhoneNumber
    );
    if (userPhoneNumber) {
      return res.status(400).json({ message: "מספר פלאפון קיים במערכת." });
    }

    updateUser = await userService.updateUserDetails({
      checkUserId,
      userIdTeuda,
      checkName,
      userEmail,
      userPhoneNumber,
      checkAddress,
      checkPaymentType,
    });

    if (!updateUser)
      return res.status(401).json({ message: "העידכון נכשל, נא לנסות שוב." });
    await updateUser.save();

    return res.status(201).json({ message: "הלקוח התעדכן בהצלחה." });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
