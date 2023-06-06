const router = require("express").Router();
const missionController = require("../controllers/MissionController");

router.get("/:username", missionController.getAllMissions);

router.post("/add-mission/:username", missionController.addNewMission);

router.patch("/update-mission/:missionId", missionController.updateMission);

router.delete("/delete-mission/:missionId", missionController.deleteMission);

module.exports = router;
