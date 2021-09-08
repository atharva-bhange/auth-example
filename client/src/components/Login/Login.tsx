import React, { useContext, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import api from "api";
import { Redirect, useHistory } from "react-router";
import { UserContext } from "components/Navigation/Navigation";

const Login: React.FC = () => {
	interface mutationVariables {
		email: string;
		password: string;
	}
	const history = useHistory();

	const user = useContext(UserContext);

	const login = useMutation(
		(data: mutationVariables) => api.post("/users/login", data),
		{
			onSuccess: (data) => {
				user.setUser({ isAuthenticated: true, ...data.data.data.user });
				history.push("/dashboard");
			},
			// TODO : Handle Errors here just in case
		}
	);
	const register = useMutation(
		(data: mutationVariables) => api.post("/users/register", data),
		{
			onSuccess: (data) => {
				user.setUser({ isAuthenticated: true, ...data.data.data.user });
				history.push("/dashboard");
			},
			// TODO : Handle Errors just in case
		}
	);
	if (user.isAuthenticated) return <Redirect to="/dashboard" />;

	return (
		<div>
			<h2>Register</h2>
			<Formik
				initialValues={{ email: "", password: "", confirmPassword: "" }}
				onSubmit={(data) => {
					register.mutate({ email: data.email, password: data.password });
				}}
				validationSchema={Yup.object({
					email: Yup.string()
						.email("Plese input valid email.")
						.required("Email is required!"),
					password: Yup.string()
						.min(8, "Password should be more than 8 character long!")
						.required("Password is required!"),
					confirmPassword: Yup.string()
						.min(8, "Password should be more than 8 character long!")
						.required("Password is required!")
						.oneOf([Yup.ref("password")], "Passwords does not match"),
				})}
			>
				<Form>
					<label htmlFor="email">Email</label>
					<Field name="email" type="text" />
					<ErrorMessage name="email" />
					<br />
					<label htmlFor="password">Password</label>
					<Field name="password" type="password" />
					<ErrorMessage name="password" />
					<br />
					<label htmlFor="confirmPassword">Confirm Password</label>
					<Field name="confirmPassword" type="password" />
					<ErrorMessage name="confirmPassword" />
					<br />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
			<h2>Login</h2>
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={(data) => {
					login.mutate(data);
				}}
				validationSchema={Yup.object({
					email: Yup.string()
						.email("Plese input valid email.")
						.required("Email is required!"),
					password: Yup.string()
						.min(8, "Password should be more than 8 character long!")
						.required("Password is required!"),
				})}
			>
				<Form>
					<label htmlFor="email">Email</label>
					<Field name="email" type="text" />
					<ErrorMessage name="email" />
					<br />
					<label htmlFor="password">Password</label>
					<Field name="password" type="password" />
					<ErrorMessage name="password" />
					<br />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
			{login.isLoading || register.isLoading ? <p>Loading</p> : undefined}
		</div>
	);
};

export default Login;
