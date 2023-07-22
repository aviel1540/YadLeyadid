const escape = require("escape-html");
const validation = require("../utils/validation");
const missionService = require("../services/missionService");
const userService = require("../services/userService");

exports.getAllMissions = async (req, res) => {
	const username = escape(req.params.username);
	const allMissionsForUser = [];
	const missionsUser = [];

	try {
		const checkUsername = validation.addSlashes(username);

		const user = await userService.findByUsername(checkUsername);
		if (!user) {
			return res.status(404).json({ message: "משתמש לא קיים." });
		}
		const missions = await missionService.allMissions();

		user.missionList.forEach((e) => {
			allMissionsForUser.push(e.toString());
		});

		missions.forEach((m) => {
			allMissionsForUser.forEach((a) => {
				if (m._id.toString() === a) {
					missionsUser.push(m);
				}
			});
		});

		if (!missions) {
			return res.status(404).json({ message: "משימה לא נמצאה." });
		}

		missionsUser.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		return res.status(200).send(missionsUser);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.addNewMission = async (req, res) => {
	const username = escape(req.params.username);
	const title = escape(req.body.title);
	let user;
	let mission;
	try {
		if (!title) {
			return res.status(400).json({ message: "יש למלא את השדה." });
		}

		const checkUsername = validation.addSlashes(username);
		const checkTitle = validation.addSlashes(title);

		user = await userService.findByUsername(checkUsername);
		if (!user) {
			return res.status(404).json({ message: "משתמש לא קיים." });
		}
		if (!user.isAdmin) {
			return res.status(401).json({
				message: "לקוח לא מנהל - לא ניתן להוסיף משימות.",
			});
		}

		mission = missionService.addMission(checkTitle);
		await mission.save();

		user.missionList.push(mission);
		await user.save();
		return res.status(201).json({ message: "המשימה נוספה בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.updateMission = async (req, res) => {
	const missionId = escape(req.params.missionId);
	const title = escape(req.body.title);
	const completed = escape(req.body.completed);
	let mission;
	try {
		const checkMissionId = validation.addSlashes(missionId);
		const checkTitle = validation.addSlashes(title);

		mission = await missionService.updateMissionDetails({
			checkMissionId,
			checkTitle,
			completed,
		});
		if (!mission) {
			return res.status(404).json({ message: "לא נמצאה משימה." });
		}
		await mission.save();
		res.status(200).json({ message: "המשימה עודכנה בהצלחה." });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteMission = async (req, res) => {
	const missionId = escape(req.params.missionId);

	try {
		const checkMissionId = validation.addSlashes(missionId);

		await missionService.deleteMission(checkMissionId);

		return res.status(200).json({ message: "המשימה נמחקה בהצלחה." });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
