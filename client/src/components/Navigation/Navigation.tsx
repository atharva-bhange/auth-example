import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";

import Home from "components/Home";
import Login from "components/Login";
import Dashboard from "components/Dashboard";
import ProtectedRoute from "components/ProtectedRoute";
import api from "api";
import Loader from "components/Loader";

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

	const [error, setError] = useState<string | null>(null);

	const { status } = useQuery(
		"isAuthenticated",
		() => api.get("/users/login"),
		{
			retry: false,
			onSuccess: (data) => {
				if (data.status === 200 && !user.isAuthenticated) {
					setUser({ isAuthenticated: true, ...data.data.data.user });
				}
			},
			onError: (err) => {
				if (!(err as any).response) {
					setError(
						"Backend server is down please contact developer at atharva.bhange@gmail.com"
					);
					return;
				}
				if ((err as any).response.status === 401 && user.isAuthenticated)
					setUser({ email: null, isAuthenticated: false });
			},
			refetchOnWindowFocus: false,
		}
	);
	if (error !== null)
		return (
			<div className="flex items-center justify-center w-screen h-screen bg-blue-800">
				<div className="text-2xl text-center text-white">{error}</div>
			</div>
		);

	if (status === "loading")
		return (
			<div className="flex items-center justify-center w-screen h-screen bg-blue-800">
				<Loader />
			</div>
		);

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
