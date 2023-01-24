const router = require("express").Router();
const userController = require("../controllers/userController");

//add new user
router.post("/register", userController.register);
//delete user by id
router.delete("/delete/:id", userController.deleteUser);
//show all users
router.get("/", userController.showAllUsers);
//search user by id
router.get("/:id", userController.searchUser);
//update user
router.patch("/:id", userController.updateUser);
//add products to user

module.exports = router;
