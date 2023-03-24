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
	},
	plugins: [],
};
