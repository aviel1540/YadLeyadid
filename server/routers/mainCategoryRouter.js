const router = require("express").Router();
const mainCategoryController = require("../controllers/MainCategoryController");
const { route } = require("./semiCategoryRouter");

router.post("/add", mainCategoryController.addNewMainCategory);

router.delete("/delete/:id", mainCategoryController.deleteMainCategory);

router.get("/", mainCategoryController.searchMainCategory);

router.get("/:id", mainCategoryController.getMainCategoryById);

router.patch("/update/:id", mainCategoryController.updateMainCategory);

router.post("/:id/aisn-semi-category/:semiId", mainCategoryController.asignSemiCategoryToMainCategory);

module.exports = router;
