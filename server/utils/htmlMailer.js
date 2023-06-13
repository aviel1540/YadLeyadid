exports.htmlMailer = (action = "", title, subTitle = "") => {
	const url = "https://YadLeyadid.com",
		text = "למעבר לאתר";

	if (action === "forgotPassword") {
		return `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%;">
        <h2 style="text-align:center;">${title}</h2>
		<h3 style="text-align:center;">${subTitle}</h3>	
        </div>`;
	}
	return `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
		<h1 style="text-align:center; color: black;">${title}</h1>
		<a href=${url} style="background:#ff7849;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
		</div>`;
};
