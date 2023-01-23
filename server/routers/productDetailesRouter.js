const router = require('express').Router();
const ProductDetailesController = require('../controllers/ProductDetailesController');

//add new product
router.post("/add", ProductDetailesController.addNewProduct);
//delete product by id
router.delete("/delete/:id",ProductDetailesController.deleteProduct);
//show all products
router.get("/",ProductDetailesController.showAllProducts);
//search product
router.get("/:id",ProductDetailesController.searchProduct);


module.exports = router;