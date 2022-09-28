import cors from "cors";
import database from './database/connect'
import express, { Application } from "express";
import { ProductsRoutes, stockRouter, UsersRoutes } from "./routes";

export class Server {
	public server: Application;

	private usersRoutes: UsersRoutes = new UsersRoutes();
	private productsRoutes: ProductsRoutes = new ProductsRoutes()

	constructor() {
		this.server = express();
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(express.urlencoded({extended: false}))

		this.usersRoutes.routes(this.server);
		this.productsRoutes.routes(this.server);
		this.server.use(stockRouter);

		database.connect();
	}
}
