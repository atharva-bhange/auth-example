import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { createConnection } from "typeorm";

(async () => {
	await createConnection({
		name: "default",
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "postgres",
		password: "postgres",
		database: "auth_example_dev",
		synchronize: true,
		logging: true,
		entities: ["src/entity/*.*"],
	});

	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`[SERVER STARTED] Server started on http://localhost:${port}`);
	});
})().catch((err) => {
	console.log(err);
});
