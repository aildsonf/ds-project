import type {Application} from 'express';
import {controller} from '../controllers/VendorController';

export class VendorRoutes {
	public routes(server: Application): void {
		server.route('/vendor')
			.get(controller.index)
			.post(controller.create);

		server.route('/vendor/:id')
			.get(controller.view)
			.put(controller.update)
			.delete(controller.delete);
	}
}
