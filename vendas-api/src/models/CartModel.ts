import mongoose from 'mongoose';

import {Schema as CartSchema} from '../schemas/CartSchema';

export type CartType = {
	productCode: string;
	amount: number;
};

export type CartInterface = {
	vendorCnpj: string;
	userCpf: string;
	content: CartType[];
	totalValue: number;
};

const Cart = mongoose.model('Cart', CartSchema);

export {Cart};
