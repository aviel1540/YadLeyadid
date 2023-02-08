const router = require("express").Router();
const categoryController = require("../controllers/CategoryController");

//add new product
router.post("/add", categoryController.addNewCategory);
//delete product by id
router.delete("/delete/:id", categoryController.deleteCategory);
//show all products
router.get("/", categoryController.showAllCategories);
//search product
router.get("/:id", categoryController.searchCategory);
//update product
router.patch("/:id", categoryController.updateCategory);

module.exports = router;
