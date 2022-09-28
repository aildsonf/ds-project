import mongoose from "mongoose";
import { Schema as UserSchema } from "../schemas/user.schema";

export interface UserInterface {
	name: string;
	cpf: string;
	address: string;
	contact: string;
}

const User = mongoose.model('User', UserSchema);

export {User}
