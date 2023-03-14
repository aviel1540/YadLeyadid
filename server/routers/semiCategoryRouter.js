const router = require("express").Router();
const categoryController = require("../controllers/SemiCategoryController");

//show all categories
router.get("/", categoryController.getAllCategories);

//search category
router.get("/:id", categoryController.gethCategoryById);

//add new category
router.post("/add", categoryController.addNewCategory);

//update category
router.patch("/update/:id", categoryController.updateCategory);

//delete category by id
router.delete("/delete/:id", categoryController.deleteCategory);

//post product to category
router.post(
	"/:id/asign-category/:productId",
	categoryController.asignProductToCategory
);

module.exports = router;
