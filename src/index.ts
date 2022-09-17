import * as dotEnv from "dotenv";
import {Server} from "./server";

dotEnv.config();

if(!process.env.PORT) {
	process.exit(1);
}

const PORT: number = Number(process.env.PORT) || 3000;

const server = new Server().app;

try {
	server.listen(PORT, () => console.log({
		serverStatus: "UP",
		message: `Server listening on :${PORT}`
	})
	);
} catch(error) {
	console.error({
		serverStatus: "DOWN",
		message: error
	});
}

