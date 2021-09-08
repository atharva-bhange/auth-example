import api from "api";
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
		<div>
			<p>Dashboard</p>
			<p>Logged in as {user.email}</p>
			<br />
			<button onClick={() => logout.mutate()}>Logout</button>
			{logout.isLoading ? <p>Loading</p> : undefined}
		</div>
	);
};

export default Dashboard;
