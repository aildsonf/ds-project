import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";

export const productsRouter: Router = Router();
const controller: ProductsController = new ProductsController();

productsRouter
	.get("/products", controller.index)
	.get("/products/:id", controller.view)
	.post("/products", controller.create)
	.put("/products/:id", controller.update)
	.delete("/products/:id", controller.delete);
