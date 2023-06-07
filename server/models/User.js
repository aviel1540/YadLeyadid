const mongoose = require("mongoose");
const { PaymentTypes } = require("../constants/paymentTypes");

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		entityCard: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			trim: true,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			required: true,
		},
		paymentType: {
			type: String,
			trim: true,
			default: PaymentTypes.NULL,
			enum: [
				PaymentTypes.CHEQUE,
				PaymentTypes.CREDITCARD,
				PaymentTypes.NOTHING,
				PaymentTypes.NULL,
			],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		productList: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		missionList: [
			{
				type: Schema.Types.ObjectId,
				ref: "Mission",
			},
		],
	},
	{
		timestamps: true,
	}
);
const User = mongoose.model("users", userSchema);
module.exports = User;
