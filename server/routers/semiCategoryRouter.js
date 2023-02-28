const router = require("express").Router();
const categoryController = require("../controllers/SemiCategoryController");

//add new category
router.post("/add", categoryController.addNewCategory);
//delete category by id
router.delete("/delete/:id", categoryController.deleteCategory);
//show all categories
router.get("/", categoryController.showAllCategories);
//search category
router.get("/:id", categoryController.searchCategory);
//update category
router.patch("/update/:id", categoryController.updateCategory);
//post product to category
router.post("/:id/asign-category/:productId", categoryController.asignProductToCategory);

module.exports = router;
