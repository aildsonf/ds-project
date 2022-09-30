import * as dotEnv from 'dotenv';

dotEnv.config();

const {PORT, DB_PASSWORD} = process.env;

if (PORT === null) {
	process.exit(1);
}

export default {
	PORT,
	DB_URI: `mongodb+srv://mongodb:${DB_PASSWORD}@cluster0.e3ejnzw.mongodb.net/?retryWrites=true&w=majority`,
};

