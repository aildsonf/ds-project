import { Request, Response } from "express";
import { isCNPJValid } from "../helpers/validators";
import { Product } from "../models/product.model";
import { Stock, StockInterface } from "../models/stock.model";
import { Vendor } from "../models/vendor.model";

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
		const {vendorCnpj, productCode} = req.params;

		Stock.findOne({vendorCnpj, productCode}, undefined, (error, stock) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(stock)
		});
	}

	public async create(req: Request, res: Response) {
		const {vendorCnpj, productCode} = req.body

		if(!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if(!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
		}

		const hasProduct = await Product.findOne({productCode});
		if(!hasProduct) {
			return res.status(404).json(`Product with barcode ${productCode} not found`)
		}

		const hasStock = await Stock.findOne({vendorCnpj, productCode});
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
		const {vendorCnpj, productCode} = req.params;

		if(!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
		}

		const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
		if(!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
		}

		const hasProduct = await Product.findOne({productCode});
		if(!hasProduct) {
			return res.status(404).json(`Product with barcode ${productCode} not found`)
		}

		const hasStock = await Stock.findOne({vendorCnpj, productCode});
		if(!hasStock) {
			return res.status(404).json(`Stock for product ${productCode} not found`)
		}

		Stock.findOneAndUpdate({vendorCnpj, productCode}, req.body, {new: true}, (error, stock) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(stock);
		})
	}

	public async delete(req: Request, res: Response) {
		const {vendorCnpj, productCode} = req.params;

		if(!isCNPJValid(vendorCnpj)) {
			return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
		}

		const hasStock = await Stock.findOne({vendorCnpj, productCode});
		if(!hasStock) {
			return res.status(404).json(`Stock for product ${productCode} not found`)
		}

		Stock.findOneAndDelete({vendorCnpj, productCode}, undefined, (error, stock) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${stock?._id}`);
		});
	}
}

const controller: StockController = new StockController();
export {controller};
