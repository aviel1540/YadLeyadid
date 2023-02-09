const router = require("express").Router();
const userController = require("../controllers/userController");

//add new user
router.post("/register", userController.register);
//login user
router.post("/login", userController.loginUser);
//delete user by id
router.delete("/delete/:id", userController.deleteUser);
//show all users
router.get("/", userController.getAllUsers);
//search user by id
router.get("/:id", userController.getUserById);
//update user
router.patch("/update-password/:id", userController.updatePassword);
//add products to user
router.patch(
	"/update-product/:user_id/productId/:product_id",
	userController.addProductUser
);
router.delete(
	"/delete-product/:user_id/productId/:product_id",
	userController.deleteProductUser
);
module.exports = router;
