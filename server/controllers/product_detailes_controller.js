const Product = require('../db/models/product_detailes');

exports.addNewProduct = async(req,res) => {
    let product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    }
    catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}