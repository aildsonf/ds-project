import mongoose from "mongoose";
import {Schema as VendorSchema} from '../schemas/vendor.schema';

export interface VendorInterface {
	name: string;
	cnpj: string;
	address: string;
	contact: string;
}

const Vendor = mongoose.model('Vendor', VendorSchema);

export {Vendor}
