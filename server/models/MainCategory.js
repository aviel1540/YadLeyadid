const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mainCategorySchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	semiCategoryList: [
		{
			type: Schema.Types.ObjectId,
			ref: "SemiCategory",
		},
	],
});

const MainCategory = mongoose.model("main-category", mainCategorySchema);
module.exports = MainCategory;
