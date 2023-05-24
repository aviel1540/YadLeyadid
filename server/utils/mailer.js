const nodemailer = require("nodemailer");
let url = "https://YadLeyadid.com";
let text = "למעבר לאתר";

exports.sendMailFunc = (clientMail, title) => {
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
		html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
		<h1 style="text-align:center; text-transform: uppercase;color: black;">${title}</h1>
		<a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
		</div>`,
	};
	transporter.sendMail(mailDetails, (error, info) => {
		if (error) return error;
		return info;
	});
};
