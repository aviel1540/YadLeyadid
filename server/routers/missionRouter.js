const router = require("express").Router();
const missionController = require("../controllers/MissionController");S

router.get('/', missionController.getAllMissions);

router.post("/add-mission", missionController.addMission);

router.patch("/update-mission/:id", missionController.updateMission);

router.delete("/delete-mission/:id", missionController.deleteMission);

module.exports = router;