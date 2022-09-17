import * as dotEnv from "dotenv";
import { Server } from "./server";

dotEnv.config();

if (process.env.PORT == null) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);

const server = new Server().server;

try {
	server.listen(PORT, () => {
		console.log({
			serverStatus: "UP",
			message: `Server listening on :${PORT}`,
		});
	});
} catch (error) {
	console.error({
		serverStatus: "DOWN",
		message: error,
	});
}
