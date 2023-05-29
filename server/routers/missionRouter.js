const router = require("express").Router();
const missionController = require("../controllers/MissionController");

router.get('/:userId', missionController.getAllMissions);

router.post("/add-mission/:userId", missionController.addNewMission);

// router.patch("/update-mission/:id", missionController.updateMission);

// router.delete("/delete-mission/:id", missionController.deleteMission);

module.exports = router;