import * as dotEnv from "dotenv";

dotEnv.config();

if (process.env.PORT == null) {
	process.exit(1);
}

export default {
	PORT: parseInt(process.env.PORT, 10),
	DB_URI: `mongodb+srv://mongodb:${process.env.DB_PASSWORD}@cluster0.e3ejnzw.mongodb.net/?retryWrites=true&w=majority`
}


