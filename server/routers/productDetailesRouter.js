const router = require("express").Router();
const productDetailesCtrl = require("../controllers/productDetailesController");
const productDetailesController = require("../controllers/productDetailesController");

//add new product
router.post("/add", productDetailesController.addNewProduct);
//delete product by id
router.delete("/delete/:id", productDetailesController.deleteProduct);
//show all products
router.get("/", productDetailesController.showAllProducts);
//search product
router.get("/:id", productDetailesController.searchProduct);
//update product
router.patch("/:id", productDetailesCtrl.updateProduct);

module.exports = router;
