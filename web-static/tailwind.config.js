/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF833C",
				secondary: "#354755",
				neutral: "#C6C5B9",
			},
		},
	},
	plugins: [],
};
