import { Request, Response } from "express";
import { Product } from "../models/Product";

// TODO: implement database
const products: Product[] = [];

export class ProductsController {
	public index(req: Request, res: Response) {
		return res.status(200).json(products);
	}

	public view(req: Request, res: Response) {
		const { id } = req.params;
		const product = products.find((product) => product.id === id);

		if (!product) {
			return res.status(404).json("product not found");
		}

		return res.status(200).json(product);
	}

	public create(req: Request, res: Response) {
		const { name, type, brand, weight, price }: Omit<Product, "id"> = req.body;
		const hasProduct = Boolean(
			products.find((product) => product.name === name)
		);

		if (!(name && type && brand && weight && price)) {
			return res.status(400).json("missing required params");
		} else if (hasProduct) {
			return res.status(400).json("product already exists");
		}

		const productId = `${new Date().getMilliseconds()}-${name}`;
		const product = new Product({
			id: productId,
			name,
			type,
			brand,
			weight,
			price,
		});

		// TODO: create product
		products.push(product);

		return res.status(201).json(product);
	}

	public update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, type, brand, weight, price }: Product = req.body;
		const product = products.find((product) => product.id === id);

		if (!product) {
			return res.status(404).json("product not found");
		}

		const _name = name || product.name;
		const _type = type || product.type;
		const _brand = brand || product.brand;
		const _weight = weight || product.weight;
		const _price = price || product.price;

		// TODO: update product
		return res.status(200).json({
			id,
			_name,
			_type,
			_brand,
			_weight,
			_price,
		});
	}

	public delete(req: Request, res: Response) {
		const { id } = req.params;
		const product = products.find((product) => product.id === id);

		if (!product) {
			return res.status(404).json("product not found");
		}

		// TODO: remove product
		return res.status(200).json(product);
	}
}
