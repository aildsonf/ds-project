import type {Application} from 'express';
import {controller} from '../controllers/StockController';

export class StockRoutes {
	public routes(server: Application): void {
		server.route('/stock')
			.get(controller.index)
			.post(controller.create);

		server.route('/stock/:id')
			.get(controller.view)
			.put(controller.update)
			.delete(controller.delete);
	}
}
