const nodemailer = require("nodemailer");
let url = "https://YadLeyadid.com";
let text = "למעבר לאתר"
exports.loanProductsConfirmMail = (mailTo, title) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_AUTH,
			pass: process.env.PASSWORD_AUTH,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_AUTH,
		to: mailTo,
		subject: "YadLeyadid",
		html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
        <h1 style="text-align:center; text-transform: uppercase;color: teal;">${title}</h1>
        <a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
        </div>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return error;
		return info;
	});
};

exports.returnProductConfirmMail = (mailTo, title) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_AUTH,
			pass: process.env.PASSWORD_AUTH,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_AUTH,
		to: mailTo,
		subject: "YadLeyadid",
		html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
        <h1 style="text-align:center; text-transform: uppercase;color: teal;">${title}</h1>
        <a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
        </div>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return error;
		return info;
	});
};

exports.extensionRequestMail = (mailTo, title) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_AUTH,
			pass: process.env.PASSWORD_AUTH,
		},
	});

	const mailOptions = {
		from: mailTo,
		to: process.env.EMAIL_AUTH,
		subject: "בקשת הארכה",
		html: `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
        <h1 style="text-align:center; text-transform: uppercase;color: teal;">${title}</h1>
        <a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
        </div>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return error;
		return info;
	});
};