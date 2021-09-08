import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";

import Home from "components/Home";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import ProtectedRoute from "components/ProtectedRoute";
import api from "api";

interface User {
	email: string | null;
	isAuthenticated: boolean;
}

export const UserContext = React.createContext<
	User & { setUser: React.Dispatch<React.SetStateAction<User>> }
>({
	email: null,
	isAuthenticated: false,
	setUser: () => {},
});

const Navigation: React.FC = () => {
	const [user, setUser] = useState<User>({
		email: null,
		isAuthenticated: false,
	});

	const { status } = useQuery(
		"isAuthenticated",
		() => api.get("/users/login"),
		{
			retry: (_, err) => {
				if ((err as any).response.status === 401) return false;
				return true;
			},
			onSuccess: (data) => {
				if (data.status === 200) {
					setUser({ isAuthenticated: true, ...data.data.data.user });
				}
			},
			onError: (err) => {
				if ((err as any).response.status === 401)
					setUser({ email: null, isAuthenticated: false });
			},
		}
	);

	if (status === "loading") return <div>Loading</div>;

	return (
		<UserContext.Provider value={{ setUser, ...user }}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<ProtectedRoute exact path="/dashboard" component={Dashboard} />
					<Route exact path="*" component={() => <div>404</div>} />
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default Navigation;
