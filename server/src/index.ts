import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createConnection } from "typeorm";

(async () => {
	await createConnection({
		name: "default",
		type: "postgres",
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		synchronize: true,
		logging: true,
		entities: ["src/entity/*.*"],
	});

	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`[SERVER STARTED] Server started on http://localhost:${port}`);
		if (process.env.LATENCY) console.log(`[LATENCY] ${process.env.LATENCY}`);
	});
})().catch((err) => {
	console.log(err);
});
