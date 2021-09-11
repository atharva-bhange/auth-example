import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

(async () => {
	await createConnection({
		name: "default",
		type: "postgres",
		url: process.env.DATABASE_URL,
		synchronize: true,
		logging: true,
		entities: [User],
		ssl:
			process.env.NODE_ENV === "production"
				? { rejectUnauthorized: false }
				: undefined,
	});

	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`[SERVER STARTED] Server started on http://localhost:${port}`);
		if (process.env.LATENCY) console.log(`[LATENCY] ${process.env.LATENCY}`);
	});
})().catch((err) => {
	console.log(err);
});
