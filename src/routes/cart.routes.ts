import type {Application} from 'express';
import {controller} from '../controllers/CartController';

export class CartRoutes {
	public routes(server: Application): void {
		server.route('/cart')
			.get(controller.index)
			.post(controller.create);

		server.route('/cart/:id')
			.get(controller.view)
			.put(controller.update)
			.delete(controller.delete);
	}
}
