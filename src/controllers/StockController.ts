import type {Request, Response} from 'express';
import {isCNPJValid} from '../helpers/validators';
import {Product} from '../models/ProductModel';
import {Stock, StockInterface} from '../models/StockModel';
import {Vendor} from '../models/VendorModel';

export class StockController {
	public async index(req: Request, res: Response) {
		await Stock.find((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async view(req: Request, res: Response) {
		const {id} = req.params;

		await Stock.findById(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async create(req: Request, res: Response) {
		const {vendorCnpj, productCode} = req.body;

		if (!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if (!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
		}

		const hasProduct = await Product.findOne({productCode});
		if (!hasProduct) {
			return res.status(404).json(`Product with barcode ${productCode} not found`);
		}

		const hasStock = await Stock.findOne({vendorCnpj, productCode});
		if (hasStock) {
			return res.status(400).json(`Stock for product ${productCode} already exists`);
		}

		const newStock = new Stock(req.body);
		newStock.save((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(201).json(payload);
		});
	}

	public async update(req: Request, res: Response) {
		const {id} = req.params;
		const {vendorCnpj, productCode} = req.body;

		const hasStock = await Stock.findById(id);
		if (!hasStock) {
			return res.status(404).json('Stock not found');
		}

		if (!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if (!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
		}

		const hasProduct = await Product.findOne({productCode});
		if (!hasProduct) {
			return res.status(404).json(`Product with barcode ${productCode} not found`);
		}

		await Stock.findByIdAndUpdate(id, req.body, {new: true}, (error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async delete(req: Request, res: Response) {
		const {id} = req.params;

		const hasStock = await Stock.findById(id);
		if (!hasStock) {
			return res.status(404).json('Stock not found');
		}

		await Stock.findByIdAndDelete(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}
}

const controller: StockController = new StockController();
export {controller};
