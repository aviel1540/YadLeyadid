const router = require("express").Router();
const mainCategoryController = require("../controllers/MainCategoryController");

router.get("/", mainCategoryController.getAllMainCategory);

router.get("/:id", mainCategoryController.getMainCategoryById);

router.post("/add", mainCategoryController.addMainCategory);

router.post(
	"/:id/asign-semi-category",
	mainCategoryController.asignSemiCategoryToMainCategory
);

router.patch("/update/:id", mainCategoryController.updateMainCategory);

router.delete("/delete/:id", mainCategoryController.deleteMainCategory);

router.delete("/:id/unasign-category/:semi_id", mainCategoryController.unassignSemiCategoryToMainCategory);




module.exports = router;
