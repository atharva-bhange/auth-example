import React from "react";

const GoogleLogin = () => {
	return (
		<a
			href={`${
				process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
			}/api/v1/auth/google`}
			rel="noreferrer"
			className="flex w-full px-8 py-2 my-2 text-white transition transform cursor-pointer rounded-xl bg-google-600 hover:scale-105 hover:bg-google-500"
		>
			<svg className="w-6 h-6 mr-4 text-white" viewBox="0 0 488 512">
				<path
					fill="currentColor"
					d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
				></path>
			</svg>
			<div className="flex-grow text-center">Login With Google</div>
		</a>
	);
};

export default GoogleLogin;
