import React, { useContext } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import api from "api";
import { Redirect, useHistory } from "react-router";
import { UserContext } from "components/Navigation/Navigation";
import Footer from "components/Footer";
import CustomInput from "./CustomInput/CustomInput";
import GoogleLogin from "./GoogleLogin";
import TwitterLogin from "./TwitterLogin";
import FacebookLogin from "./FacebookLogin";
import GithubLogin from "./GithubLogin";
import Loader from "components/Loader";
import FormError from "./FormError";

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
		}
	);
	const register = useMutation(
		(data: mutationVariables) => api.post("/users/register", data),
		{
			onSuccess: (data) => {
				user.setUser({ isAuthenticated: true, ...data.data.data.user });
				history.push("/dashboard");
			},
		}
	);
	if (user.isAuthenticated) return <Redirect to="/dashboard" />;

	return (
		<div className="flex flex-col w-full bg-blue-800 md:h-screen ">
			<div className="flex flex-col flex-grow md:flex-row">
				<div className="flex flex-col flex-1 ">
					<div className="text-2xl font-semibold text-center text-white justify-self-center md:text-3xl">
						Register
					</div>
					<div className="flex flex-col justify-center flex-grow">
						<Formik
							initialValues={{
								email: "",
								password: "",
								confirmPassword: "",
								submit: "",
							}}
							onSubmit={(data, { setFieldError }) => {
								register.mutate(
									{ email: data.email, password: data.password },
									{
										onError: (err) => {
											setFieldError(
												"submit",
												(err as any).response.data.message
											);
										},
									}
								);
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
									.oneOf([Yup.ref("password")], "Passwords do not match"),
							})}
						>
							<Form className="flex flex-col px-10 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
								<FormError name="submit" />
								<CustomInput
									name="email"
									label="Email :"
									type="email"
									placeholder="chimp@ape.com"
									disabled={register.isLoading}
								/>
								<CustomInput
									type="password"
									name="password"
									label="Password :"
									placeholder="chimp secret"
									disabled={register.isLoading}
								/>
								<CustomInput
									type="password"
									placeholder="and again"
									name="confirmPassword"
									label="Confirm Password :"
									disabled={register.isLoading}
								/>
								<button
									className="flex items-center self-center p-2 px-6 mt-2 text-lg text-white align-middle transition transform bg-green-500 disabled:opacity-70 rounded-xl md:flex-1 md:mx-10 hover:scale-105 hover:bg-green-400 md:text-xl"
									type="submit"
									disabled={register.isLoading}
								>
									{register.isLoading && (
										<div className="mr-2">
											<Loader className="w-7 h-7 loader" />
										</div>
									)}

									<div>Register</div>
								</button>
							</Form>
						</Formik>
					</div>
				</div>
				<div className="flex flex-col flex-1">
					<div className="text-2xl font-semibold text-center text-white md:text-3xl">
						Login
					</div>
					<div className="flex flex-col justify-center flex-grow">
						<Formik
							initialValues={{ email: "", password: "", submit: "" }}
							onSubmit={(data, { setFieldError }) => {
								login.mutate(
									{ email: data.email, password: data.password },
									{
										onError: (err) => {
											setFieldError(
												"submit",
												(err as any).response.data.message
											);
										},
									}
								);
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
							<Form className="flex flex-col px-10 md:px-20 lg:px-32 xl:px-48 2xl:px-64">
								<FormError name="submit" />
								<CustomInput
									name="email"
									label="Email :"
									placeholder="eagle@bird.com"
									type="email"
									disabled={login.isLoading}
								/>
								<CustomInput
									name="password"
									label="Password :"
									type="password"
									placeholder="bird secret"
									disabled={login.isLoading}
								/>
								<button
									className="flex items-center self-center p-2 px-6 mt-2 text-lg text-white transition transform bg-green-500 disabled:opacity-70 justify-items-center align-middlealign-middle rounded-xl md:flex-1 md:mx-10 hover:scale-105 hover:bg-green-400 md:text-xl"
									type="submit"
									disabled={login.isLoading}
								>
									{login.isLoading && (
										<div className="mr-2">
											<Loader className="w-7 h-7 loader" />
										</div>
									)}

									<div className="flex-grow">Login</div>
								</button>
							</Form>
						</Formik>
						<div className="flex flex-col items-center px-10 mt-4 sm:px-8 lg:px-32 xl:px-48 2xl:px-64">
							<GoogleLogin />
							<TwitterLogin />
							<FacebookLogin />
							<GithubLogin />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
