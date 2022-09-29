import mongoose from "mongoose";
import {Schema as StockSchema} from '../schemas/stock.schema';

export interface StockInterface {
	vendorCnpj: string;
	productCode: string;
	amount: number;
}

const Stock = mongoose.model('Stock', StockSchema);

export {Stock}
