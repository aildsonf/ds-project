import { Router } from "express";
import { StockController } from "../controllers/StockController";

export const stockRouter: Router = Router();
const controller: StockController = new StockController();

stockRouter
	.get("/products", controller.index)
	.get("/products/:id", controller.view)
	.post("/products", controller.insert)
	.put("/products/:id", controller.update)
	.delete("/products/:id", controller.delete);
