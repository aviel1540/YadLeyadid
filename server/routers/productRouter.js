const router = require("express").Router();
const productController = require("../controllers/ProductController");

router.get("/", productController.getProducts);

router.get("/loan-return-close", productController.allProductsWithLoanDateClose);

router.get("/wait-confirm-extension-request", productController.allProductsWaitConfirmExtensionRequest);

router.get("/accepted-extension-request", productController.allProductsAcceptedExtensionRequest);

router.get("/product-place-counters", productController.productsCounters);

router.post("/add-product", productController.addProduct);

router.post("/extension-request-answer/:id", productController.updateExtensionRequest);

router.post("/ask-extension-request/:id", productController.askForExtensionRequest);

router.get("/:id", productController.getProductById);

router.delete("/delete/:id", productController.deleteProduct);

router.patch("/update/:id", productController.updateProduct);

router.patch("/:id/loan-return/:userId", productController.updateExtensionRequest);



module.exports = router;
