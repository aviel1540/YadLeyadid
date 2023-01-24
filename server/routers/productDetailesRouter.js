const router = require('express').Router();
const productDetailesCtrl = require('../controllers/ProductDetailesController');
const ProductDetailesController = require('../controllers/ProductDetailesController');

//add new product
router.post("/add", ProductDetailesController.addNewProduct);
//delete product by id
router.delete("/delete/:id",ProductDetailesController.deleteProduct);
//show all products
router.get("/",ProductDetailesController.showAllProducts);
//search product
router.get("/:id",ProductDetailesController.searchProduct);
//update product
router.patch('/:id', productDetailesCtrl.updateProduct);

module.exports = router;