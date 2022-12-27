const express = require('express');
const router = express.Router();
const productsController = require('../controllers/product_detailes_controller');

router.post("/add", productsController.addNewProduct);



module.exports = router;