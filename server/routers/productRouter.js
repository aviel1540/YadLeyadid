const router = require("express").Router();
const productController = require("../controllers/ProductController");

router.get("/", productController.getProducts);

router.get("/loan-return-close", productController.allProductsWithLoanDateClose);

router.post("/add-product", productController.addProduct);

router.post("/ask-extension-request/:id", productController.askForExtensionRequest);

router.get("/:id", productController.getProductById);

router.delete("/delete/:id", productController.deleteProduct);

router.patch("/update/:id", productController.updateProduct);

router.patch("/:id/loan-return/:userId", productController.updateExtensionRequest);



module.exports = router;
