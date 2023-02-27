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
		// const productId = escape(req.body.productId);
		let product;
		try {
			if (!productName) {
				return res.status(400).json({ message: "יש למלא את השדות" });
			}

			const checkProductName = addSlashes(productName);
			// const checkProductId = addSlashes(productId);

			// const productIdFound = await Product.findOne({ productId: checkProductId });

			// if (productIdFound) {
			// 	return res.status(400).json({ message: "מזהה קיים במערכת" });
			// }
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
