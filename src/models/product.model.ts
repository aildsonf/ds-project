import mongoose from "mongoose";
import { Schema as ProductSchema } from "../schemas/product.schema";

export interface ProductInterface {
	name: string;
	barcode: string;
	brand: string;
	weight: number;
	price: number;
};

const Product = mongoose.model('Product', ProductSchema);

export {Product}

