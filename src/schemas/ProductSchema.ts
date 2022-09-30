import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	barcode: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		default: '',
	},
	weight: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
