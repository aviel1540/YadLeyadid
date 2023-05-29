const escape = require('escape-html');
const validation = require('../utils/validation');
const missionService = require("../services/missionService");
const userService = require("../services/userService");

exports.getAllMissions = async (req, res) => {
    const userId = escape(req.params.userId);
    let user;
    try {
        const checkUserId = validation.addSlashes(userId);
        user = await userService.findUserById(checkUserId);
        if (!user) {
            return res.status(400).json({ message: "לקוח לא קיים" });
        }
        return res.status(200).send(user.missionList);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

exports.addNewMission = async (req, res) => {
    const userId = escape(req.params.userId);
    const title = escape(req.body.title);
    let user;
    let mission;
    try {
        if (!title) {
            return res.status(400).json({ message: "יש למלא את השדות." });
        }

        const checkuserId = validation.addSlashes(userId);
        const checkTitle = validation.addSlashes(title);

        user = await userService.findUserById(checkuserId);
        if(!user.isAdmin){
            return res.status(403).json({ message: "לקוח לא מנהל - לא ניתן לייצר ולהוסיף משימות"})
        }

        mission = await missionService.addMission(checkTitle);
        await mission.save();

        user.missionList.push(mission);
        await user.save();
        return res.status(201).json({ message: "המשימה נוספה בהצלחה" });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}