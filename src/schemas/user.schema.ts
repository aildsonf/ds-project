import mongoose from "mongoose";

export const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	vendorCnpj: {
		type: String,
	},
	created: {
		type: Date,
		default: Date.now
	}
})
