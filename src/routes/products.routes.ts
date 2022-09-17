import express, { Request, Response } from "express";

export class ProductsRoutes {
	public routes(app: express.Application): void {
		app.route("/products")
			.get((req: Request, res: Response) => {
				res.status(200).send("GET ok");
			})
			.post((req: Request, res: Response) => {
				res.status(200).send("POST ok");
			})
			.patch((req: Request, res: Response) => {
				res.status(200).send("PATCH ok");
			})
			.put((req: Request, res: Response) => {
				res.status(200).send("PUT ok");
			})
			.delete((req: Request, res: Response) => {
				res.status(200).send("DELETE ok");
			});
	}
}
