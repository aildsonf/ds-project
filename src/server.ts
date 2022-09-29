import cors from "cors";
import database from './database/connect'
import express, { Application } from "express";
import { CartRoutes, ProductsRoutes, StockRoutes, UsersRoutes, VendorRoutes } from "./routes";

export class Server {
	public server: Application;

	private cartRoutes: CartRoutes = new CartRoutes();
	private usersRoutes: UsersRoutes = new UsersRoutes();
	private productsRoutes: ProductsRoutes = new ProductsRoutes();
	private stockRoutes: StockRoutes = new StockRoutes();
	private vendorRoutes: VendorRoutes = new VendorRoutes();

	constructor() {
		this.server = express();
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(express.urlencoded({extended: false}))

		this.cartRoutes.routes(this.server);
		this.usersRoutes.routes(this.server);
		this.productsRoutes.routes(this.server);
		this.stockRoutes.routes(this.server);
		this.vendorRoutes.routes(this.server);

		database.connect();
	}
}
