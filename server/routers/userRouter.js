const router = require("express").Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);

router.get("/admins", userController.getAllAdmins);

router.get("/:id", userController.getUserById);

router.post("/validation-mail", userController.checkEmailForChangePass);

router.get("/find-by-username/:username", userController.getUserByUsername);

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post(
	"/add-product/:user_id/asign-products",
	userController.addProductForUser
);

router.patch("/update-password/:id", userController.updatePassword);

router.patch("/update-details/:id", userController.updateDetails);

router.delete("/delete/:id", userController.deleteUser);

router.delete(
	"/delete-product/:user_id/productId/:product_id",
	userController.unassignProductUser
);

module.exports = router;
