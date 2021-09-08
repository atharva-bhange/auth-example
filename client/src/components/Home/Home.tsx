import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div>
			<h2>HOME</h2>
			<Link to="/login">Login</Link>
		</div>
	);
};

export default Home;
