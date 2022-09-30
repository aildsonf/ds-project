import type {Request, Response} from 'express';
import {isCNPJValid, isCPFValid} from '../helpers/validators';
import type {CartInterface} from '../models/CartModel';
import {Cart} from '../models/CartModel';
import {Product} from '../models/ProductModel';
import {User} from '../models/UserModel';
import {Vendor} from '../models/VendorModel';

export class CartController {
	public async index(req: Request, res: Response) {
		await Cart.find((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async view(req: Request, res: Response) {
		const {id} = req.params;

		await Cart.findById(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async create(req: Request, res: Response) {
		const data: CartInterface = req.body;
		const {vendorCnpj, userCpf, content} = data;

		if (!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if (!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
		}

		if (!isCPFValid(userCpf)) {
			return res.status(400).json(`User CPF ${userCpf} is invalid`);
		}

		const hasUser = await User.findOne({cpf: userCpf});
		if (!hasUser) {
			return res.status(404).json(`User with CPF ${userCpf} not found`);
		}

		content.map(async product => {
			const hasProduct = await Product.findOne({barcode: product.productCode});
			if (!hasProduct) {
				return res.status(404).json(`Product with barcode ${product.productCode} not found`);
			}
		});

		const hasCart = await Cart.findOne({vendorCnpj, userCpf});
		if (hasCart) {
			return res.status(400).json('Cart already exists');
		}

		const newCart = new Cart(data);
		newCart.save((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(201).json(payload);
		});
	}

	public async update(req: Request, res: Response) {
		const {id} = req.params;
		const data: CartInterface = req.body;
		const {vendorCnpj, userCpf, content} = data;

		if (!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if (!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
		}

		if (!isCPFValid(userCpf)) {
			return res.status(400).json(`User CPF ${userCpf} is invalid`);
		}

		const hasUser = await User.findOne({cpf: userCpf});
		if (!hasUser) {
			return res.status(404).json(`User with CPF ${userCpf} not found`);
		}

		content.map(async product => {
			const hasProduct = await Product.findOne({barcode: product.productCode});
			if (!hasProduct) {
				return res.status(404).json(`Product with barcode ${product.productCode} not found`);
			}
		});

		const hasCart = await Cart.findById(id);
		if (!hasCart) {
			return res.status(404).json('Cart not found');
		}

		await Cart.findByIdAndUpdate(id, data, {new: true}, (error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async delete(req: Request, res: Response) {
		const {id} = req.params;

		const hasCart = await Cart.findById(id);
		if (!hasCart) {
			return res.status(404).json('Cart not found');
		}

		await Cart.findByIdAndDelete(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}
}

const controller: CartController = new CartController();
export {controller};
