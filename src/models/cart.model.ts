import mongoose from "mongoose";
import { ProductInterface } from "./product.model";
import {Schema as CartSchema} from "../schemas/cart.schema";

export type CartType = {
	productCode: Pick<ProductInterface, 'barcode'>,
	amount: number
}

export interface CartInterface {
	vendorCnpj: string;
	userCpf: string;
	content: CartType[];
	totalValue: number;
}

const Cart = mongoose.model('Cart', CartSchema);

export {Cart}
