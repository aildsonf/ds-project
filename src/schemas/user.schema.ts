import { randomUUID } from "crypto";
import mongoose from "mongoose";

export const Schema = new mongoose.Schema({
	uuid: {
		type: String,
		default: randomUUID()
	},
	name: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true
	},
	address: {
		type: String,
		default: ''
	},
	contact: {
		type: String,
		default: '',
	},
	created: {
		type: Date,
		default: Date.now
	}
})
