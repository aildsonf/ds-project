import { randomUUID } from "crypto";
import mongoose from "mongoose";

const CartContent = new mongoose.Schema({
	productCode: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	}
})

export const Schema = new mongoose.Schema({
	uuid: {
		type: String,
		default: randomUUID()
	},
	vendorCnpj: {
		type: String,
		required: true
	},
	userCpf: {
		type: String,
		required: true
	},
	content: {
		type: CartContent,
		required: true
	},
	totalValue: {
		type: Number,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
})
