const router = require("express").Router();
const categoryController = require("../controllers/SemiCategoryController");

//show all categories
router.get("/", categoryController.getAllSemiCategories);

//search category
router.get("/:id", categoryController.getSemiCategoryById);

//add new category
router.post("/add", categoryController.addNewSemiCategory);

//update category
router.patch("/update/:id", categoryController.updateSemiCategoryDetails);

//delete category by id
router.delete("/delete/:id", categoryController.deleteSemiCategory);

//post product to category
router.post(
	"/:id/asign-category",
	categoryController.assignProductToSemiCategory
);

router.delete(
	"/:id/unasign-category/:productId",
	categoryController.unassignProductFromSemiCategory
);

module.exports = router;
