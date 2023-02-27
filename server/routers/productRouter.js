const router = require("express").Router();
const productController = require("../controllers/ProductController");

//add new product
router.get("/", productController.getProducts);

router.post("/add-product", productController.addProduct);

module.exports = router;
