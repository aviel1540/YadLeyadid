const Mission = require("../models/Mission");

exports.allMissions = async() => await Mission.find();

exports.addMission = async(title) => new Mission({title});