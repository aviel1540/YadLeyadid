const nodemailer = require("nodemailer");
const { htmlMailer } = require("./htmlMailer");

exports.sendMailFunc = (identification, clientMail, title, subTitle = "") => {
	let mailDetails;
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_AUTH,
			pass: process.env.PASSWORD_AUTH,
		},
	});
	mailDetails = {
		from: process.env.EMAIL_AUTH,
		to: clientMail,
		subject: "Yad Leyadid",
		html: htmlMailer(identification, title, subTitle),
	};
	transporter.sendMail(mailDetails, (error, info) => {
		if (error) return error;
		return info;
	});
};
