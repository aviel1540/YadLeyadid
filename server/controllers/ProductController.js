const Product = require("../models/Product");
const escape = require("escape-html");
const addSlashes = require("../utils/validation/validation");

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
				return res.status(400).json({ message: "יש למלא את השדות" });
			}

			const checkProductName = addSlashes(productName);

			product = new Product({
				// productId: id++,
				productName: checkProductName,
			});
			await product.save();
			res.status(201).json(product);
		} catch (err) {
			return res.status(401).json({ message: err.message });
		}
	},
	getSpecificProduct: async (req, res) => {
		const productId = escape(req.params.id);
		let product;
		try {
			const checkProductId = addSlashes(productId);
			product = await Product.findById(checkProductId);
			if (!product)
				return res.status(404).json({ message: "מוצר לא קיים" });
			return res.status(200).json(product);
		} catch (err) {
			return res.status(404).json({ message: err });
		}
	},
	deleteProduct: async (req, res) => {
		const productId = escape(req.params.id);
		let product;
		try {
			const checkProductId = addSlashes(productId);
			product = await Product.findByIdAndRemove(checkProductId);
			if (!product)
				return res.status(404).json({ message: "מוצר לא קיים"});
			return res.status(200).json({ message: "המוצר נמחק בהצלחה" });
		} catch (err) {
			return res.status(404).json({ message: err });
		}
	},
	updateProduct: async (req, res) => {
		const productId = escape(req.params.id);
		const productName = escape(req.body.productName);

		let updateProduct;
		try {
			const checkId = addSlashes(productId);
			const checkProductName = addSlashes(productName);

			updateProduct = await Product.findByIdAndUpdate(checkId, {
				productName: checkProductName
			})
			if(!updateProduct)
				return res.status(401).json({message: "מוצר לא קיים"});
			
			updateProduct = await updateProduct.save();
			return res.status(201).json({message: "המוצר התעדכן בהצלחה"});
		} catch (err) {
			return res.status(400).json({message: err});
		}
	}
};

module.exports = productCtrl;
