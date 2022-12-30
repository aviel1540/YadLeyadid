const express = require('express');
const router = express.Router();
const product_Detailes_Controller = require('../controllers/product_detailes_controller');

//add new product
router.post("/add", product_Detailes_Controller.addNewProduct);
//delete product by id
router.delete("/delete/:id",product_Detailes_Controller.deleteProduct);
//show all products
router.get("/",product_Detailes_Controller.showAllProducts);
//search product
router.get("/:id",product_Detailes_Controller.searchProduct);


module.exports = router;