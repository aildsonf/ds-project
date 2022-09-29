import { Application } from "express";
import { controller } from "../controllers/products.controller";

export class ProductsRoutes {
	public routes(server: Application): void {
		server.route('/products').get(controller.index).post(controller.create);
		server.route('/products/:barcode').get(controller.view).put(controller.update).delete(controller.delete);
	}
}
