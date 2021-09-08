import express from "express";
import morgan from "morgan";
import session from "express-session";
import redisConnect from "connect-redis";
import redis from "redis";
import cors from "cors";
import passport from "passport";
declare module "express-session" {
	interface SessionData {
		userId: number;
	}
}

const redisClient = redis.createClient({ port: 6379 });

import userRoutes from "./routes/userRoutes";
import googleAuthRoutes from "./routes/googleAuthroutes";
import globalErrorhandler from "./controllers/errorController";
import AppError from "./utils/AppError";
import configureGoogleAuth from "./utils/configureGoogleAuth";

const RedisStore = redisConnect(session);

const { FRONTEND_CLIENT = "http://localhost:3000" } = process.env;

const app = express();

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_CLIENT,
	})
);

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use(
	session({
		name: "qid",
		resave: false,
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		store: new RedisStore({ client: redisClient }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
		},
	})
);

app.use(passport.initialize());

configureGoogleAuth();

app.use("/api/v1/auth/google", googleAuthRoutes);

app.use("/api/v1/users", userRoutes);

app.use("*", (req, res, next) => {
	next(new AppError("No resource found on this route", 404));
});

app.use(globalErrorhandler);

export default app;
