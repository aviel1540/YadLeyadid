const Category = require("../models/Category");
const escape = require("escape-html");
const {
  addSlashes,
  validateEmail,
  isLengthUsername,
  isLengthPassword,
} = require("../utils/validation/validation");
const Product = require("../models/Product");

const categoryCtrl = {
  //add new product controller
  addNewCategory: async (req, res) => {
    const serialNumber = escape(req.body.serialNumber);
    const name = escape(req.body.name);
    try {
      const checkSerialNumber = addSlashes(serialNumber);
      const checkName = addSlashes(name);

      const categoryFound = await Category.findOne({ serialNumber: checkSerialNumber });
      if (categoryFound) {
        res.status(400).json({ message: "הקטגוריה קיימת במערכת" });
      }
      const category = new Category({
        serialNumber: checkSerialNumber,
        name: checkName,
        quantity: 0
      });

      await category.save();
      res.status(201).json({ message: "קטגוריה נוספה בהצלחה" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  },
  //delete category controller
  deleteCategory: async (req, res) => {
    const id = escape(req.params.id);
    try {
      const checkId = addSlashes(id);
      const categoryResult = await Category.findByIdAndDelete(checkId);
      if (!categoryResult) {
        return res.status(404).json({ message: "לא נמצאה קטגוריה" });
      }
      res.status(200).json({ message: "נמחק בהצלחה" });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //show all categories controller
  showAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(201).json({ categories });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //search specific Category
  searchCategory: async (req, res) => {
    const idSearch = escape(req.params.id);
    try {
      const checkIdSearch = addSlashes(idSearch);
      const category = await Category.findById(checkIdSearch);
      if (!category) return res.status(400).send("No Category Found !");
      res.status(200).json({ category });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  //update product Details
  updateCategory: async (req, res) => {
    const id = escape(req.params.id);
    const serialNumber = escape(req.body.serialNumber);
    const name = escape(req.body.name);

    let updatedCategory;
    try {
      const checkId = addSlashes(id);
      const checkSerialNumber = addSlashes(serialNumber);
      const checkName = addSlashes(name);
 
      updatedCategory = await Category.findByIdAndUpdate(checkId, {
        serialNumber: checkSerialNumber,
        name: checkName,
      })

      if (!updatedCategory) {
       return res.status(401).json({ message: "לא נמצאה קטגוריה" });
      }
      updatedCategory = await updatedCategory.save();

      res.status(201).json({ message: "קטגוריה עודכנה בהצלחה" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }

  },
  //post product to category
  asignProductToCategory: async (req,res) => {
    const categoryId = escape(req.params.id);
    const productId = escape(req.params.productId);
    try {
      const checkCategoryId = addSlashes(categoryId);
      const checkProductId = addSlashes(productId);
      
      const category = await Category.findById(checkCategoryId);
      if(!category)
        return res.status(404).json({ message: " לא נמצאה קטגוריה" });
      
      const product = await Product.findById(checkProductId);
      if(!product)
        return res.status(404).json({ message: "לא נמצא מוצר" });

      if(product.inCategory)
        return res.status(400).json({ message: "המוצר משוייך לקטגוריה אחרת" });

      const productExist = category.productList.find((id) => id.toString() === checkProductId);
      
      if (productExist)
				return res.status(400).json({ message: "מוצר זה קיים בקטגוריה" });
      let cntQuantity = product.quantity + 1;
      category.productList.push(product);
      await Product.findByIdAndUpdate(checkProductId, {
        quantity: cntQuantity,
        inCategory: true,
      });

      await category.save();
			return res.status(201).json({ message: "שוייך בהצלחה"});
    }catch(err) {
			return res.status(401).json({ message: err.message });
    }
  }
};

module.exports = categoryCtrl;
