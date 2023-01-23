const Product = require('../models/ProductDetailes');
const productDetailesCtrl = {

    //add new product controller
    addNewProduct : async(req,res) => {
        let product = new Product(req.body);
        try {
            await product.save();
            res.status(201).send(product.name + " added successfully !");
        }
        catch(err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    //delete product controller
    deleteProduct  : async(req,res) => {
        const id = req.params.id;
        try{
            const result = await Product.findByIdAndDelete(id);
            if(result == null) {
                return res.status(404).send("No Product Were Found !");
            } 
            res.status(200).send(result.name + " deleted successfully !");
        } catch(err) {
            res.status(404).send(err);
        }
    },
    //show all products controller
    showAllProducts : async(req,res) => {
        try {
            let Products = await Product.find();
            res.status(201).send(Products);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    //show specific Product
    searchProduct : async(req,res) => {
        let productSerach = await Product.findById(req.params.id);
        try {
            if(!productSerach)
                return res.status(400).send("No Product Found !")
            res.status(200).send(productSerach);
        } catch(err) {
            res.status(400).send(err);
        }
    }
}

module.exports = productDetailesCtrl;