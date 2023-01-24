const User = require('../models/User');
const Auth = require('../utils/auth/auth');
const userCtrl = {
    //add new user controller
    addNewUser : async(req,res) => {
        let user = new User(req.body);
        try {
            user.password = await Auth.hashPassword(user.password); 
            await user.save();
            res.status(201).send(user.name + " added successfully !");
        } catch(err) {
            res.status(400).send(err);
        }
    },

    //delete user controller
    deleteUser : async(req,res) => {
        const id = req.params.id;
        try {
            const userResult = await User.findByIdAndDelete(id);
            if(userResult == null) {
                return res.status(404).send("No User Were Found !");
            }
            res.status(200).send(userResult.name + " deleted successfully !");
        } catch(err) {
            res.status(404).send(err);
        }
    },

    //show all users
    showAllUsers : async(req,res) => {
        try {
            let Users = await User.find();
            res.status(201).send(Users);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    //search user by id
    searchUser : async(req,res) => {
        let userSearch = await User.findById(req.params.id);
        try {
            if(!userSearch)
                return res.status(400).send("No User Found !");
            res.status(200).send(userSearch);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    //update user detailes
    updateUser : async(req,res) => {
        
    }
}

module.exports = userCtrl;