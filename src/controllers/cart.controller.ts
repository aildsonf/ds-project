import { Request, Response } from "express";
import { isCNPJValid, isCPFValid } from "../helpers/validators";
import { Cart, CartInterface } from "../models/cart.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { Vendor } from "../models/vendor.model";

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
		const data: CartInterface = req.body;
		const {vendorCnpj, userCpf, content} = data;

		if(!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if(!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
		}

		if(!isCPFValid(userCpf)) {
			return res.status(400).json(`User CPF ${userCpf} is invalid`)
		}

		const hasUser = await User.findOne({cpf: userCpf});
		if(!hasUser) {
			return res.status(404).json(`User with CPF ${userCpf} not found`)
		}

		content.map(async (product) => {
			const hasProduct = await Product.findOne({barcode: product.productCode});
			if(!hasProduct) {
				return res.status(404).json(`Product with barcode ${product.productCode} not found`)
			}
		})

		const hasCart = await Cart.findOne({vendorCnpj, userCpf});
		if(hasCart) {
			return res.status(400).json(`Cart already exists`);
		}

		const newCart = new Cart(data);
		newCart.save((error, cart) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(cart);
		});
	}

	public async update(req: Request, res: Response) {
		const {uuid} = req.params;
		const data: CartInterface = req.body;
		const {vendorCnpj, userCpf, content} = data;

		if(!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if(!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
		}

		if(!isCPFValid(userCpf)) {
			return res.status(400).json(`User CPF ${userCpf} is invalid`)
		}

		const hasUser = await User.findOne({cpf: userCpf});
		if(!hasUser) {
			return res.status(404).json(`User with CPF ${userCpf} not found`)
		}

		content.map(async (product) => {
			const hasProduct = await Product.findOne({barcode: product.productCode});
			if(!hasProduct) {
				return res.status(404).json(`Product with barcode ${product.productCode} not found`)
			}
		})

		const hasCart = await Cart.findOne({uuid});
		if(!hasCart) {
			return res.status(404).json(`Cart with uuid ${uuid} not found`)
		}

		Cart.findOneAndUpdate({uuid}, data, {new: true}, (error, cart) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(cart);
		})
	}

	public async delete(req: Request, res: Response) {
		const {uuid} = req.params;

		const hasCart = await Cart.findOne({uuid});
		if(!hasCart) {
			return res.status(404).json(`Cart with uuid ${uuid} not found`)
		}

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
