import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

export const usersRouter: Router = Router();
const controller: UsersController = new UsersController();

usersRouter
	.get("/users", controller.index)
	.get("/users/:login", controller.view)
	.post("/users", controller.create)
	.put("/users/:login", controller.update)
	.delete("/users/:login", controller.delete);
