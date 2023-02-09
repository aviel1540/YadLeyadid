const router = require('express').Router();
const productController = require('../controllers/ProductController');

//add new product
router.post('/product', productController.addProduct);