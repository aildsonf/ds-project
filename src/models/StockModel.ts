import mongoose from 'mongoose';

import {Schema as StockSchema} from '../schemas/StockSchema';

export type StockInterface = {
	vendorCnpj: string;
	productCode: string;
	amount: number;
};

const Stock = mongoose.model('Stock', StockSchema);

export {Stock};
