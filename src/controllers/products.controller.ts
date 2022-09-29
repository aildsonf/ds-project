import { Request, Response } from "express";
import { Product, ProductInterface } from "../models/product.model";

class ProductsController {
	public index(req: Request, res: Response) {
		Product.find((error, products) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(products)
		})
	}

	public view(req: Request, res: Response) {
		const {barcode} = req.params;

		Product.findOne({barcode}, undefined, (error, product) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(product)
		});
	}

	public async create(req: Request, res: Response) {
		const {barcode} = req.body

		const hasProduct = await Product.findOne({barcode});
		if(hasProduct) {
			return res.status(400).json(`Product with barcode ${req.body.barcode} already exists`);
		}

		const newProduct = new Product(req.body);
		newProduct.save((error, product) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(product);
		});
	}

	public async update(req: Request, res: Response) {
		const {barcode} = req.params;

		const hasProduct = await Product.findOne({barcode});
		if(!hasProduct) {
			return res.status(404).json(`Product with barcode ${barcode} not found`)
		}

		Product.findOneAndUpdate({barcode}, req.body, {new: true}, (error, product) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(product);
		})
	}

	public async delete(req: Request, res: Response) {
		const {barcode} = req.params;

		const hasProduct = await Product.findOne({barcode});
		if(!hasProduct) {
			return res.status(404).json(`Product with barcode ${barcode} not found`)
		}

		Product.findOneAndDelete({barcode}, undefined, (error, product) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${product?._id}`);
		});
	}
}

const controller: ProductsController = new ProductsController();
export {controller};
