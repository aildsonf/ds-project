import cors from 'cors';
import database from './database/connect';
import type {Application} from 'express';
import express from 'express';
import {ProductsRoutes} from './routes';

export class Server {
	public server: Application;

	private readonly productsRoutes: ProductsRoutes = new ProductsRoutes();

	constructor() {
		this.server = express();
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(express.urlencoded({extended: false}));

		this.productsRoutes.routes(this.server);

		void database.connect();
	}
}
