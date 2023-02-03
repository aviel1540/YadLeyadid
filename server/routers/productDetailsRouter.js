const router = require("express").Router();
const productDetailsCtrl = require("../controllers/productDetailsController");
const productDetailsController = require("../controllers/productDetailsController");

//add new product
router.post("/add", productDetailsController.addNewProduct);
//delete product by id
router.delete("/delete/:id", productDetailsController.deleteProduct);
//show all products
router.get("/", productDetailsController.showAllProducts);
//search product
router.get("/:id", productDetailsController.searchProduct);
//update product
router.patch("/:id", productDetailsCtrl.updateProduct);

module.exports = router;
