import type {Request, Response} from 'express';
import {Product, ProductInterface} from '../models/ProductModel';

class ProductsController {
	public async index(req: Request, res: Response) {
		await Product.find((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async view(req: Request, res: Response) {
		const {id} = req.params;

		await Product.findById(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async create(req: Request, res: Response) {
		const {barcode} = req.body;

		const hasProduct = await Product.findOne({barcode});
		if (hasProduct) {
			return res.status(400).json(`Product with barcode ${req.body.barcode} already exists`);
		}

		const newProduct = new Product(req.body);
		newProduct.save((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(201).json(payload);
		});
	}

	public async update(req: Request, res: Response) {
		const {id} = req.params;

		const hasProduct = await Product.findById(id);
		if (!hasProduct) {
			return res.status(404).json('Product not found');
		}

		await Product.findByIdAndUpdate(id, req.body, {new: true}, (error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async delete(req: Request, res: Response) {
		const {id} = req.params;

		const hasProduct = await Product.findById(id);
		if (!hasProduct) {
			return res.status(404).json('Product not found');
		}

		await Product.findByIdAndDelete(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}
}

const controller: ProductsController = new ProductsController();
export {controller};
