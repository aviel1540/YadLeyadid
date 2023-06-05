const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const missionSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const Mission = mongoose.model("mission", missionSchema);
module.exports = Mission;
