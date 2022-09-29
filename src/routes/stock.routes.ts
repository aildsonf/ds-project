import { Application } from "express";
import {controller} from "../controllers/stock.controller";

export class StockRoutes {
	public routes(server: Application): void {
		server.route('/stock').get(controller.index).post(controller.create);
		server.route('/stock/:uuid').get(controller.view).put(controller.update).delete(controller.delete);
	}
}
