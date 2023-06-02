const Mission = require("../models/Mission");

exports.allMissions = async () => await Mission.find();

exports.addMission = async (title) => new Mission({ title });

exports.updateMissionDetails = async (request) => {
    return await Mission.findByIdAndUpdate(request.checkMissionId, {
        title: request.checkTitle,
        finish: request.checkFinish
    }
    )
}