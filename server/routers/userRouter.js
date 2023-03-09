const router = require("express").Router();
const userController = require("../controllers/userController");
//show all users
router.get("/", userController.getAllUsers);

//add new user
router.post("/register", userController.register);
//login user
router.post("/login", userController.loginUser);
//delete user by id
router.delete("/delete/:id", userController.deleteUser);

//search user by id
router.get("/:id", userController.getUserById);
router.get("/find-by-username/:username", userController.getUserByUsername);
//update user
router.patch("/update-password/:id", userController.updatePassword);
//add products to user
router.post(
	"/add-product/:user_id/productId/:product_id",
	userController.addProductUser
);
router.delete(
	"/delete-product/:user_id/productId/:product_id",
	userController.deleteProductUser
);
//get user by username
router.get("/user-list/:id", userController.getUserProducts);

module.exports = router;
