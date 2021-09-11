import express from "express";
import morgan from "morgan";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import redisConnect from "connect-redis";
import redis from "redis";
declare module "express-session" {
	interface SessionData {
		userId: number;
	}
}

const redisClient = redis.createClient(process.env.REDIS_URL);

const RedisStore = redisConnect(session);

import userRoutes from "./routes/userRoutes";
import googleAuthRoutes from "./routes/googleAuthRoutes";
import twitterAuthRoutes from "./routes/twitterAuthRoutes";
import facebookAuthRoutes from "./routes/facebookAuthRouter";
import githubAuthRoutes from "./routes/githubAuthRouter";
import globalErrorhandler from "./controllers/errorController";
import AppError from "./utils/AppError";
import configureGoogleAuth from "./utils/configureGoogleAuth";
import configureTwitterAuth from "./utils/configureTwitterAuth";
import configureFacebookAuth from "./utils/configureFacebookAuth";
import configureGithubAuth from "./utils/configureGithubAuth";

const { FRONTEND_CLIENT = "http://localhost:3000", LATENCY = "0" } =
	process.env;

const app = express();

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_CLIENT,
	})
);

app.use((_, __, next) => {
	setTimeout(() => {
		next();
	}, parseInt(LATENCY));
});

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

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

configureTwitterAuth();

configureFacebookAuth();

configureGithubAuth();

app.use("/api/v1/auth/google", googleAuthRoutes);

app.use("/api/v1/auth/twitter", twitterAuthRoutes);

app.use("/api/v1/auth/facebook", facebookAuthRoutes);

app.use("/api/v1/auth/github", githubAuthRoutes);

app.use("/api/v1/users", userRoutes);

app.use("*", (req, res, next) => {
	next(new AppError("No resource found on this route", 404));
});

app.use(globalErrorhandler);

export default app;
