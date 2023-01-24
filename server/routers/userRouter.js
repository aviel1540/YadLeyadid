const router = require('express').Router();
const UserController = require('../controllers/UserController');

//add new user
router.post('/add', UserController.addNewUser);
//delete user by id
router.delete('/delete/:id', UserController.deleteUser);
//show all users
router.get('/',UserController.showAllUsers);
//search user by id
router.get('/:id', UserController.searchUser);
//update user
router.patch('/:id', UserController.updateUser);
//add products to user


module.exports = router;