const router = require("express").Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);

router.get("/admins", userController.getAllAdmins);

router.get("/:id", userController.getUserById);

router.get("/find-by-username/:username", userController.getUserByUsername);

router.post("/forgot-password", userController.forgotPassword);

router.post("/verification-code", userController.verificationCode);

router.post("/change-password", userController.changePassword);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post(
	"/add-product/:userId/asign-products",
	userController.addProductForUser
);

router.patch("/update-password/:id", userController.updatePassword);

router.patch("/update-details/:id", userController.updateDetails);

router.delete("/delete/:id", userController.deleteUser);

router.delete(
	"/delete-product/:userId/productId/:productId",
	userController.unassignProductUser
);

module.exports = router;
