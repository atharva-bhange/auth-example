import express from "express";
import morgan from "morgan";
import session from "express-session";
import redisConnect from "connect-redis";
import redis from "redis";
import cors from "cors";

declare module "express-session" {
	interface SessionData {
		userId: number;
	}
}

const redisClient = redis.createClient({ port: 6379 });

import userRoutes from "./routes/userRoutes";
import globalErrorhandler from "./controllers/errorController";
import AppError from "./utils/AppError";

const RedisStore = redisConnect(session);

const app = express();

app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_CLIENT || "http://localhost:3000",
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

app.use("/api/v1/users", userRoutes);

app.use("*", (req, res, next) => {
	next(new AppError("No resource found onthis route", 404));
});

app.use(globalErrorhandler);

export default app;
