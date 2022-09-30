import type {Application} from 'express';
import {controller} from '../controllers/UsersController';

export class UsersRoutes {
	public routes(server: Application): void {
		server.route('/users')
			.get(controller.index)
			.post(controller.create);

		server.route('/users/:id')
			.get(controller.view)
			.put(controller.update)
			.delete(controller.delete);
	}
}

