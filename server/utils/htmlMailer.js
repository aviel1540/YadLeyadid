exports.htmlMailer = (
	action = "",
	title,
	subTitle = "",
	url = "https://YadLeyadid.com",
	text = "למעבר לאתר"
) => {
	if (action === "forgotPassword") {
		return `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%;">
        <h4 style="text-align:center;">${title}</h4>
		<h4 style="text-align:center;">${subTitle}</h4>	
        </div>`;
	}
	return `<div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px;font-size: 110%">
		<h1 style="text-align:center; text-transform: uppercase;color: black;">${title}</h1>
		<a href=${url} style="background:crimson;text-decoration: none;color: white; padding: 10px 20px; margin: 10px 0;display: inline-block">${text}</a>  
		</div>`;
};
