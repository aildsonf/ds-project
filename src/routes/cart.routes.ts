import { Application } from "express";
import {controller} from "../controllers/cart.controller";

export class CartRoutes {
	public routes(server: Application): void {
		server.route('/cart').get(controller.index).post(controller.create);
		server.route('/cart/:uuid').get(controller.view).put(controller.update).delete(controller.delete);
	}
}
