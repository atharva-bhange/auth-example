import api from "api";
import Footer from "components/Footer";
import Loader from "components/Loader";
import { UserContext } from "components/Navigation/Navigation";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";

const Dashboard: React.FC = () => {
	const user = useContext(UserContext);

	const history = useHistory();

	const logout = useMutation("logout", () => api.post("/users/logout"), {
		onSuccess: (data) => {
			user.setUser({ email: null, isAuthenticated: false });
			if (data.status === 200) history.push("/");
		},
	});

	return (
		<div className="flex flex-col w-screen h-screen bg-blue-800">
			<div className="flex flex-col items-center flex-grow text-white">
				<div className="text-3xl md:text-5xl">Dashboard</div>

				<div className="mt-4 text-xl text-center md:text-4xl">
					Logged in as {user.email}
				</div>
				<div
					className="flex px-10 py-2 mt-4 transition transform bg-red-600 cursor-pointer rounded-xl hover:scale-105 hover:bg-red-500"
					onClick={() => logout.mutate()}
				>
					{logout.isLoading && (
						<div className="mr-2">
							<Loader className="w-7 h-7 loader" />
						</div>
					)}

					<div className="flex-grow">Logout</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 ml-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Dashboard;
