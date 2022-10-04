import mongoose from 'mongoose';

import {Schema as ProductSchema} from '../schemas/ProductSchema';

export type ProductInterface = {
	name: string;
	barcode: string;
	brand?: string;
	weight?: number;
	amount?: number;
	price: number;
};

const Product = mongoose.model('Product', ProductSchema);

export {Product};

