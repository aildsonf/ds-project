import { Request, Response } from "express";
import { isCNPJValid, isCPFValid } from "../helpers/validators";
import { User, UserInterface } from "../models/user.model";
import { Vendor } from "../models/vendor.model";

class UsersController {
	public index(req: Request, res: Response) {
		User.find((error, users) => {
			if(error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(users)
		})
	}

	public view(req: Request, res: Response) {
		const {cpf} = req.params;

		if(!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`)
		}

		User.findOne({cpf}, undefined, (error, user) => {
			if(error) {
				return res.status(500).json(error);
			}
			return res.status(200).json(user)
		});
	}

	public async create(req: Request, res: Response) {
		const {cpf, type, vendorCnpj} = req.body;

		if(!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`)
		}

		const hasUser = await User.findOne({cpf});
		if(hasUser) {
			return res.status(400).json(`User with CPF ${cpf} already exists`);
		}

		if(!['admin', 'vendor', 'customer'].includes(type)) {
			return res.status(400).json(`User type ${type} is invalid`);
		}

		if(vendorCnpj) {
			if(!isCNPJValid(vendorCnpj)) {
				return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
			}

			const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
			if(!hasVendor) {
				return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
			}
		}

		const newUser = new User(req.body);
		newUser.save((error, user) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(user);
		});
	}

	public async update(req: Request, res: Response) {
		const {cpf, type, vendorCnpj} = req.params;

		if(!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`)
		}

		const hasUser = await User.findOne({cpf});
		if(!hasUser) {
			return res.status(404).json(`User with CPF ${cpf} not found`)
		}

		if(!['admin', 'vendor', 'customer'].includes(type)) {
			return res.status(400).json(`User type ${type} is invalid`);
		}

		if(vendorCnpj) {
			if(!isCNPJValid(vendorCnpj)) {
				return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`)
			}

			const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
			if(!hasVendor) {
				return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`)
			}
		}

		User.findOneAndUpdate({cpf}, req.body, {new: true}, (error, user) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(user);
		})
	}

	public async delete(req: Request, res: Response) {
		const {cpf} = req.params;

		if(!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`)
		}

		const hasUser = await User.findOne({cpf});
		if(!hasUser) {
			return res.status(404).json(`User with CPF ${cpf} not found`)
		}

		User.findOneAndDelete({cpf}, undefined, (error, user) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${user?._id}`);
		});
	}
}

const controller: UsersController = new UsersController();
export {controller};
