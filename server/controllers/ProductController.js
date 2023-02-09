const Product = require("../models/Product");
const escape = require("escape-html");
const {
	addSlashes,
	validateEmail,
	isLengthUsername,
	isLengthPassword,
} = require("../utils/validation/validation");

let id = 1;
const productCtrl = {
	getProducts: async (req, res) => {
		try {
			const product = await Product.find();
			return res.status(200).send(product);
		} catch (err) {
			return res.status(401).json({ message: err.message });
		}
	},
	addProduct: async (req, res) => {
		const productName = escape(req.body.productName);
		let product;
		try {
			if (!productName) {
				return res.status(400).json({ message: "יש למלא את השדה" });
			}
			const checkProductName = addSlashes(productName);

			const productIdFound = await Product.findOne({
				productId: id,
			});
			if (productIdFound) {
				return res.status(400).json({ message: "מזהה קיים במערכת" });
			}
			product = new Product({
				productId: id++,
				productName: checkProductName,
			});
			await product.save();
			res.status(201).json(product);
		} catch (err) {
			return res.status(401).json({ message: err.message });
		}
	},
};

module.exports = productCtrl;
