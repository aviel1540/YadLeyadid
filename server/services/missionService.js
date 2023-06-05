const Mission = require("../models/Mission");

exports.allMissions = async () => await Mission.find();

exports.addMission = (title) => new Mission({ title });

exports.updateMissionDetails = async (request) => {
	return await Mission.findByIdAndUpdate(request.checkMissionId, {
		title: request.checkTitle,
		completed: request.completed,
	});
};

exports.deleteMission = async(missionId) => await Mission.findByIdAndRemove(missionId);