const router = require("express").Router();
const userController = require("../controllers/userController");

//show all users
router.get("/", userController.getAllUsers);

//add new user
router.post("/register", userController.register);

//login user
router.post("/login", userController.login);

//delete user by id
router.delete("/delete/:id", userController.deleteUser);

//search user by id
router.get("/:id", userController.getUserById);

//get user by username
router.get("/find-by-username/:username", userController.getUserByUsername);

//update user
router.patch("/update-password/:id", userController.updatePassword);

//add products to user
router.post(
	"/add-product/:user_id/productId/:product_id",
	userController.addProductForUser
);

router.post(
	"/add-product/:user_id",
	userController.addProductForUser2
);

router.delete(
	"/delete-product/:user_id/productId/:product_id",
	userController.deleteProductUser
);

router.get("/user-list/:id", userController.getUserProducts);

module.exports = router;
