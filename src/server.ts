import cors from "cors";
import express, { Application } from "express";
import { productsRouter, stockRouter, usersRouter } from "./routes";

export class Server {
	public server: Application;

	constructor() {
		this.server = express();
		this.server.use(cors());
		this.server.use(express.json());

		this.server.use(usersRouter);
		this.server.use(productsRouter);
		this.server.use(stockRouter);
	}
}
