const Product = require("../models/ProductDetails");

const productDetailsCtrl = {
  //add new product controller
  addNewProduct: async (req, res) => {
    let product = new Product(req.body);
    try {
      await product.save();
      res.status(201).send(product.name + " added successfully !");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  //delete product controller
  deleteProduct: async (req, res) => {
    const id = req.params.id;
    try {
      const productResult = await Product.findByIdAndDelete(id);
      if (productResult == null) {
        return res.status(404).send("No Product Were Found !");
      }
      res.status(200).send(productResult.name + " deleted successfully !");
    } catch (err) {
      res.status(404).send(err);
    }
  },
  //show all products controller
  showAllProducts: async (req, res) => {
    try {
      let Products = await Product.find();
      res.status(201).send(Products);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  //search specific Product
  searchProduct: async (req, res) => {
    let productSearch = await Product.findById(req.params.id);
    try {
      if (!productSearch) return res.status(400).send("No Product Found !");
      res.status(200).send(productSearch);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  //update product Details
  updateProduct: async (req, res) => {},
};

module.exports = productDetailsCtrl;
