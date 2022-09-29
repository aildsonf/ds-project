import mongoose from "mongoose";
import { Schema as UserSchema } from "../schemas/user.schema";

export type UserType = {
	admin: 'admin',
	vendor: 'vendor',
	customer: 'customer'
}

export interface UserInterface {
	name: string;
	cpf: string;
	password: string;
	type: UserType;
	vendorCnpj?: string;
}

const User = mongoose.model('User', UserSchema);

export {User}
