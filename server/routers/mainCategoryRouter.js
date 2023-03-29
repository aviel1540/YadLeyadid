const router = require("express").Router();
const mainCategoryController = require("../controllers/MainCategoryController");

router.get("/", mainCategoryController.getAllMainCategory);

router.get("/:id", mainCategoryController.getMainCategoryById);

router.get("/main-list/:id", mainCategoryController.getMainCategorySemiCategory)

router.post("/add", mainCategoryController.addNewMainCategory);

router.post(
	"/:id/asign-semi-category/:semiId",
	mainCategoryController.asignSemiCategoryToMainCategory
);

router.patch("/update/:id", mainCategoryController.updateMainCategory);

router.delete("/delete/:id", mainCategoryController.deleteMainCategory);



module.exports = router;
