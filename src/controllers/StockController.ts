import { Request, Response } from "express";
import { ItemInterface, Stock, StockInterface } from "../models/Stock";

// TODO: implement database
const stock: StockInterface = new Stock();

export class StockController {
	public index(req: Request, res: Response) {
		return res.status(200).json(stock);
	}

	public view(req: Request, res: Response) {
		const { id } = req.params;
		const item = stock.items.find((item) => item.reference === id);

		if (!item) {
			return res.status(404).json("item not found");
		}

		return res.status(200).json(item);
	}

	public insert(req: Request, res: Response) {
		const { reference, amount }: ItemInterface = req.body;
		const hasItem = Boolean(
			stock.items.find((item) => item.reference === reference)
		);

		if (!(reference && amount)) {
			return res.status(400).json("missing required params");
		} else if (hasItem) {
			return res.status(400).json("item already exists");
		}

		const item = { reference, amount };

		// TODO: create item
		stock.addItem(item);

		return res.status(201).json(item);
	}

	public update(req: Request, res: Response) {
		const { reference: ref } = req.params;
		const { reference, amount }: ItemInterface = req.body;
		const item = stock.items.find((item) => item.reference === ref);

		if (!item) {
			return res.status(404).json("item not found");
		}

		const _reference = reference || item.reference;
		const _amount = amount || item.amount;

		// TODO: update item
		return res.status(200).json({
			_reference,
			_amount,
		});
	}

	public delete(req: Request, res: Response) {
		const { reference } = req.params;
		const item = stock.items.find((item) => item.reference === reference);

		if (!item) {
			return res.status(404).json("item not found");
		}

		// TODO: remove item
		return res.status(200).json(item);
	}
}
