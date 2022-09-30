import mongoose from 'mongoose';

import {Schema as UserSchema} from '../schemas/UserSchema';

export enum UserTypes {
	admin = 'admin',
	vendor = 'vendor',
	customer = 'customer',
}

export type UserInterface = {
	name: string;
	cpf: string;
	password: string;
	type: UserTypes;
	vendorCnpj?: string;
};

const User = mongoose.model('User', UserSchema);

export {User};
