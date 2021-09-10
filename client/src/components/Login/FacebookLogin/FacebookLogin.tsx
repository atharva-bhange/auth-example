import React from "react";

const FacebookLogin = () => {
	return (
		<a
			href={`${
				process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
			}/api/v1/auth/facebook`}
			rel="noreferrer"
			className="flex w-full px-8 py-2 my-2 text-white transition transform cursor-pointer rounded-xl bg-facebook-600 hover:bg-facebook-500 hover:scale-105"
		>
			<svg className="w-6 h-6 mr-4" viewBox="0 0 320 512">
				<path
					fill="currentColor"
					d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
				></path>
			</svg>

			<div className="flex-grow text-center">Login With Facebook</div>
		</a>
	);
};

export default FacebookLogin;
