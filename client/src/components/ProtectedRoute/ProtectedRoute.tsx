import { UserContext } from "components/Navigation/Navigation";
import React, { useContext } from "react";
import { Redirect, Route } from "react-router";

type Props = React.ComponentProps<typeof Route>;

const ProtectedRoute: React.FC<Props> = (props) => {
	const { component, ...rest } = props;

	// if (status === "loading") return <div>loading...</div>;
	const user = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				user.isAuthenticated ? (
					React.createElement(component!, props)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
