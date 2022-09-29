import { Request, Response } from "express";
import { Cart, CartInterface } from "../models/cart.model";

// TODO: add validations
export class CartController {
	public index(req: Request, res: Response) {
		Cart.find((error, cart) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(cart)
		})
	}

	public view(req: Request, res: Response) {
		const {uuid} = req.params;

		Cart.findOne({uuid}, undefined, (error, cart) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(cart)
		});
	}

	public async create(req: Request, res: Response) {
		const newCart = new Cart(req.body);

		newCart.save((error, cart) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(cart);
		});
	}

	public async update(req: Request, res: Response) {
		const {uuid} = req.params;
		const hasCart = await Cart.findOne({uuid});

		if(!hasCart) {
			return res.status(404).json(`Cart with uuid ${uuid} not found`)
		}

		Cart.findOneAndUpdate({uuid}, req.body, {new: true}, (error, cart) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(cart);
		})
	}

	public delete(req: Request, res: Response) {
		const {uuid} = req.params;

		Cart.findOneAndDelete({uuid}, undefined, (error, cart) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${cart?._id}`);
		});
	}
}

const controller: CartController = new CartController();
export {controller};
