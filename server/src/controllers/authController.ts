import { RequestHandler } from "express";
import { compare } from "bcryptjs";

import { User } from "../entity/User";
import { validate } from "class-validator";
import AppError from "../utils/AppError";
import { getConnection } from "typeorm";

export const register: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError("Please Provide Email and Password", 440));

	let existingUser = await getConnection()
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.email = :email", { email: email })
		.getOne();

	if (existingUser)
		return next(
			new AppError("This email is already registered. Please log in.", 409)
		);

	let newUser = User.create({
		email: email,
		password: password,
	});

	const errors = await validate(newUser);

	if (errors.length > 0)
		return next(new AppError("Validation Error", 400, errors));

	newUser = await newUser.save();
	newUser.password = undefined;

	req.session.userId = newUser.id;

	res.status(200).json({
		status: "success",
		data: {
			user: newUser,
		},
	});
};

export const login: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError("Please Provide Email and Password", 440));

	let existingUser = getConnection()
		.getRepository(User)
		.createQueryBuilder("user")
		.where("user.email = :email", { email: email });

	const errors = await validate(existingUser);

	if (errors.length > 0)
		return next(new AppError("Validation Error", 400, errors));

	let user = await existingUser.getOne();

	if (user && !user.password)
		return next(
			new AppError("This email is associated with social login!", 402)
		);

	if (!user || !(await compare(password, user.password)))
		return next(new AppError("Incorrect email or password", 401));

	req.session.userId = user.id;
	user.password = undefined;

	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	});
};

export const isLoggedIn: RequestHandler = async (req, res, next) => {
	if (req.session.userId) {
		const user = await User.findOne(req.session.userId);
		user.password = undefined;

		res.status(200).json({
			status: "success",
			data: { user },
		});
	} else res.sendStatus(401);
};

export const logout: RequestHandler = async (req, res, next) => {
	req.session.destroy(() => {
		res.clearCookie("qid").sendStatus(200);
	});
};
