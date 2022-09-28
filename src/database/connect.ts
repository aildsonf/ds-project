import mongoose from 'mongoose';
import configuration from '../configuration';
import logger from '../helpers/logger';

class Database {
	public async connect() {
		await mongoose.connect(configuration.DB_URI).then(() => logger.info('Successfully connected to database')).catch((error) => logger.error(error));
	}

	public async close() {
		await mongoose.connection.close().then(() => logger.info('Connection to database closed')).catch((error) => logger.error(error));
	}
}

export default new Database();
