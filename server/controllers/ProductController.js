const escape = require("escape-html");
const validation = require("../utils/validation");
const { ProductPlace } = require("../constants/productPlace");
const productService = require("../services/productService");
const userService = require("../services/userService");

exports.getProducts = async (req, res) => {
  let products = [];
  let details;
  let userLoan;
  try {
    const product = await productService.allProducts();
    for (let i = 0; i < product.length; i++) {
      const productDetails = product[i];
      if (productDetails.loanBy) {
        userLoan = await userService.findUserById(productDetails.loanBy);
        details = {
          productName: productDetails.productName,
          place: productDetails.place,
          loanDate: productDetails.loanDate,
          loanReturn: productDetails.loanReturn,
          inCategory: productDetails.inCategory,
          user: userLoan.name,
          email: userLoan.email,
          phoneNumber: userLoan.phoneNumber,
        };
        products.push(details);
      } else {
        products.push(productDetails);
      }
    }
    return res.status(200).send(products);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  const productName = escape(req.body.productName);
  let product;

  try {
    if (!productName) {
      return res.status(400).json({ message: "יש למלא את השדות." });
    }

    const checkProductName = validation.addSlashes(productName);

    product = await productService.addProduct(checkProductName);

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const productId = escape(req.params.id);
  let product;
  let userLoan;
  try {
    const checkProductId = validation.addSlashes(productId);

    product = await productService.findProductById(checkProductId);

    if (!product) return res.status(404).json({ message: "מוצר לא קיים." });
    if (product.loanBy)
      userLoan = await userService.findUserById(product.loanBy);

    const userDetails = {
      name: userLoan.name,
      email: userLoan.email,
      phoneNumber: userLoan.phoneNumber,
    };

    return res.status(200).json({ product, userDetails });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = escape(req.params.id);
  const productName = escape(req.body.productName);

  let updateProduct;
  try {
    const checkId = validation.addSlashes(productId);
    const checkProductName = validation.addSlashes(productName);

    updateProduct = await productService.updateProduct(
      checkId,
      checkProductName
    );

    if (!updateProduct)
      return res.status(401).json({ message: "מוצר לא קיים." });

    await updateProduct.save();
    return res.status(201).json({ message: "המוצר התעדכן בהצלחה." });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = escape(req.params.id);
  let product;
  try {
    const checkProductId = validation.addSlashes(productId);

    product = await productService.findProductById(checkProductId);

    if (!product) return res.status(404).json({ message: "מוצר לא קיים." });

    if (product.inCategory) {
      return res
        .status(401)
        .json({ message: "לא ניתן למחוק - משוייך לקטגוריה." });
    }

    if (
      product.place == ProductPlace.LOANED ||
      product.place == ProductPlace.REPAIR
    ) {
      return res
        .status(401)
        .json({ message: "לא ניתן למחוק - המוצר לא זמין במלאי." });
    }
    await productService.deleteProduct(checkProductId);
    return res.status(200).json({ message: "המוצר נמחק בהצלחה." });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
