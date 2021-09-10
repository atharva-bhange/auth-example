module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				google: {
					600: "#ea4335",
					500: "#ec5649",
					400: "#ee695d",
					300: "#f07b72",
					200: "#f28e86",
					100: "#f5a19a",
				},
				twitter: {
					600: "#1da1f2",
					500: "#34aaf3",
					400: "#4ab4f5",
					300: "#61bdf6",
					200: "#77c7f7",
					100: "#8ed0f9",
				},
				facebook: {
					600: "#4267b2",
					500: "#5576ba",
					400: "#6885c1",
					300: "#7b95c9",
					200: "#8ea4d1",
					100: "#a1b3d9",
				},
				github: {
					600: "#333333",
					500: "#474747",
					400: "#5c5c5c",
					300: "#707070",
					200: "#858585",
					100: "#999999",
				},
			},
		},
	},
	variants: {
		extend: {
			opacity: ["disabled"],
		},
	},
	plugins: [],
};
