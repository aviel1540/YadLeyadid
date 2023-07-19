const router = require("express").Router();
const userController = require("../controllers/UserController");
const { auth } = require("../middleware/auth");
const { adminOnly } = require("../middleware/adminOnly");

router.get("/", auth, adminOnly, userController.getAllUsers);

router.get("/admins", auth, adminOnly, userController.getAllAdmins);

router.get("/:id", auth, adminOnly, userController.getUserById);

router.get(
	"/find-by-username/:username",
	auth,
	userController.getUserByUsername
);

router.post("/forgot-password", userController.forgotPassword);

router.post("/verification-code", userController.verificationCode);

router.post("/change-password", userController.changePassword);

router.post("/register", auth, adminOnly, userController.register);

router.post("/login", userController.login);

router.post(
	"/add-product/:userId/asign-products",
	auth,
	adminOnly,
	userController.addProductForUser
);

router.patch(
	"/update-password/:id",
	auth,
	adminOnly,
	userController.updatePassword
);

router.patch(
	"/update-details/:id",
	auth,
	adminOnly,
	userController.updateDetails
);

router.delete("/delete/:id", auth, adminOnly, userController.deleteUser);

router.delete(
	"/delete-product/:userId/productId/:productId",
	auth,
	adminOnly,
	userController.unassignProductUser
);

module.exports = router;
