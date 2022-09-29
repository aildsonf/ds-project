import { Application } from "express";
import {controller} from "../controllers/vendor.controller";

export class VendorRoutes {
	public routes(server: Application): void {
		server.route('/vendor').get(controller.index).post(controller.create);
		server.route('/vendor/:cnpj').get(controller.view).put(controller.update).delete(controller.delete);
	}
}
