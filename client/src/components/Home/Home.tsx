import Footer from "components/Footer";
import { UserContext } from "components/Navigation/Navigation";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GithubButton from "./GithubButton";
import GoToButton from "./GoToButton";
import SuccessButton from "./SuccessButton";

const Home: React.FC = () => {
	const user = useContext(UserContext);

	const history = useHistory();

	return (
		<div className="flex flex-col w-full h-screen bg-blue-800">
			<div className="py-4 text-4xl font-semibold text-center text-gray-200 md:text-5xl">
				Auth Example
			</div>
			<div className="mx-6 text-lg text-center text-gray-300 md:text-xl">
				This is a example app created to better understand and demonstrate{" "}
				<b>email/password</b> based auth and oAuth using{" "}
				<b>Google, Facebook, Twitter and Github</b>
			</div>
			<div className="flex flex-col mt-2 md:flex-grow md:flex-row md:items-center ">
				<SuccessButton
					title={user.isAuthenticated ? "Dashboard" : "Login"}
					onClick={() => {
						if (user.isAuthenticated) history.push("/dashboard");
						else history.push("/login");
					}}
				/>
				<GithubButton href="https://github.com/atharva-bhange/auth-example" />
			</div>
			<div className="flex-grow">
				<div className="text-center ">
					<div className="text-2xl text-gray-300 md:text-3xl">
						Test Protected Routes
					</div>
					<div className="flex flex-col mt-2 md:flex-row md:mx-40">
						<GoToButton
							path="/login"
							onClick={() => {
								history.push("/login");
							}}
						/>
						<GoToButton
							onClick={() => {
								history.push("/dashboard");
							}}
							path="/dashboard"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
