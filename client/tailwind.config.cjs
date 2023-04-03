/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			xl: { max: "1600px" },
			lg: { max: "1400px" },
			md: { max: "1064px" },
			sm: { max: "639px" },
		},
		colors: {
			blue: "#1fb6ff",
			white: "#ffffff",
			purple: "#7e5bef",
			pink: "#ff49db",
			red: "#E21818",
			orange: "#ff7849",
			"orange-lite": "#FFA45B",
			green: "#13ce66",
			yellow: "#ffc82c",
			"gray-dark": "#273444",
			gray: "#8492a6",
			"gray-light": "#d3dce6",
		},
	},
	plugins: [],
};
