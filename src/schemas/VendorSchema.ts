import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cnpj: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
