const router = require("express").Router();
const productController = require("../controllers/ProductController");
const {adminOnly} = require('../middleware/adminOnly')

router.get("/", adminOnly,productController.getProducts);

router.get("/loan-return-close", adminOnly,productController.allProductsWithLoanDateClose);

router.get("/wait-confirm-extension-request", adminOnly,productController.allProductsWaitConfirmExtensionRequest);

router.get("/accepted-extension-request",adminOnly, productController.allProductsAcceptedExtensionRequest);

router.get("/product-place-counters", adminOnly,productController.productsCounters);

router.post("/add-product",adminOnly, productController.addProduct);

router.post("/extension-request-answer/:id", adminOnly,productController.updateExtensionRequest);

router.post("/ask-extension-request/:id", productController.askForExtensionRequest);

router.get("/:id",adminOnly, productController.getProductById);

router.delete("/delete/:id", adminOnly,productController.deleteProduct);

router.patch("/update-location/:id", adminOnly,productController.updateProductLocation);

// router.patch("/:id/loan-return/:userId", adminOnly,productController.updateExtensionRequest);



module.exports = router;
