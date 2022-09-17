import express from "express";
import cors from "cors";
import { UsersRoutes, ProductsRoutes } from "./routes";

export class Server {
	public app: express.Application;
	public usersRoutes: UsersRoutes= new UsersRoutes();
	public productRoutes: ProductsRoutes = new ProductsRoutes();

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());

		this.usersRoutes.routes(this.app);
		this.productRoutes.routes(this.app);
	}
}
