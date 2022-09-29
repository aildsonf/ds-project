import mongoose from "mongoose";

export const Schema = new mongoose.Schema({
	vendorCnpj: {
		type: String,
		required: true,
	},
	productCode: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
})
