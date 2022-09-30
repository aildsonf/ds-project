import {Server} from './server';
import configuration from './configuration';
import logger from './helpers/logger';

const {server} = new Server();

try {
	server.listen(configuration.PORT, () => {
		logger.info(`Server listening at http://localhost:${configuration.PORT}`);
	});
} catch (error: unknown) {
	logger.error(error);
}
