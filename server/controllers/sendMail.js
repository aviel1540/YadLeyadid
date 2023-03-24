const nodemailer = require("nodemailer");

exports.sendMail = (mailTo, title, url, text) => {
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
        <h1 style="text-align:center; text-transform: uppercase;color: teal;">יכלב השרת גמור אני מתחיל עם ריאקט 💖</h1>
        <a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
        <p>אם הכפתור לא עובד מסיבה כלשהי, אפשר גם ללחוץ על הלינק למטה.</p>        
        <div>${url}</div>
        </div>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return error;
		return info;
	});
};
