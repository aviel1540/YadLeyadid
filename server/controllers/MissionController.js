const escape = require('escape-html');
const validation = require('../utils/validation');
const missionService = require("../services/missionService");

exports.getAllMissions = async(req,res) => {
    try {
        const missions = await missionService.allMissions();
        return res.status(200).send(missions);
    }catch(err) {
        return res.status(401).json({message: err.message});
    }
}