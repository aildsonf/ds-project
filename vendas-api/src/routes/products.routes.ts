import type {Application} from 'express';
import {controller} from '../controllers/ProductsController';

export class ProductsRoutes {
	public routes(server: Application): void {
		server.route('/products')
			.get(controller.index)
			.post(controller.create);

		server.route('/products/:id')
			.get(controller.view)
			.put(controller.update)
			.delete(controller.delete);
	}
}
