const Category = require("../models/Category");

const categoryCtrl = {
  //add new product controller
  addNewCategory: async (req, res) => {
    let category = new Category(req.body);
    try {
      await category.save();
      res.status(201).send(category.name + " added successfully !");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  //delete product controller
  deleteCategory: async (req, res) => {
    const id = req.params.id;
    try {
      const categoryResult = await Category.findByIdAndDelete(id);
      if (categoryResult == null) {
        return res.status(404).send("No category Were Found !");
      }
      res.status(200).send(categoryResult.name + " deleted successfully !");
    } catch (err) {
      res.status(404).send(err);
    }
  },
  //show all products controller
  showAllCategories: async (req, res) => {
    try {
      let Categories = await Category.find();
      res.status(201).send(Categories);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  //search specific Product
  searchCategory: async (req, res) => {
    let categorySearch = await Category.findById(req.params.id);
    try {
      if (!categorySearch) return res.status(400).send("No Category Found !");
      res.status(200).send(categorySearch);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  //update product Details
  updateCategory: async (req, res) => {},
};

module.exports = categoryCtrl;
