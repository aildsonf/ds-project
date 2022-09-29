import { Request, Response } from "express";
import { Stock, StockInterface } from "../models/stock.model";

// TODO: add validations
export class StockController {
	public index(req: Request, res: Response) {
		Stock.find((error, stock) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(stock)
		})
	}

	public view(req: Request, res: Response) {
		const {productCode} = req.params;

		Stock.findOne({productCode}, undefined, (error, stock) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(stock)
		});
	}

	public async create(req: Request, res: Response) {
		const {productCode} = req.body
		const hasStock = await Stock.findOne({productCode});

		if(hasStock) {
			return res.status(400).json(`Stock for product ${productCode} already exists`);
		}

		const newStock = new Stock(req.body);

		newStock.save((error, stock) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(stock);
		});
	}

	public async update(req: Request, res: Response) {
		const {productCode} = req.params;
		const hasStock = await Stock.findOne({productCode});

		if(!hasStock) {
			return res.status(404).json(`Stock for product ${productCode} not found`)
		}

		Stock.findOneAndUpdate({productCode}, req.body, {new: true}, (error, stock) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(stock);
		})
	}

	public delete(req: Request, res: Response) {
		const {productCode} = req.params;

		Stock.findOneAndDelete({productCode}, undefined, (error, stock) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${stock?._id}`);
		});
	}
}

const controller: StockController = new StockController();
export {controller};
