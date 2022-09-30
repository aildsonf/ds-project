import type {Request, Response} from 'express';
import {isCNPJValid, isCPFValid} from '../helpers/validators';
import type {UserInterface} from '../models/UserModel';
import {UserTypes} from '../models/UserModel';
import {User} from '../models/UserModel';
import {Vendor} from '../models/VendorModel';

class UsersController {
	public async index(req: Request, res: Response) {
		await User.find((error, payload) => {
			if (error) {
				return res.status(500).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async view(req: Request, res: Response) {
		const {id} = req.params;

		await User.findById(id, undefined, (error, payload) => {
			if (error) {
				return res.status(500).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async create(req: Request, res: Response) {
		const data: UserInterface = req.body;
		const {name, cpf, password, type, vendorCnpj} = data;

		const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
		if (!nameRegex.test(name)) {
			return res.status(400).json('Invalid name');
		}

		if (password.length < 8) {
			return res.status(400).json('Password length must contains at least 8 characters');
		}

		if (!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`);
		}

		const hasUser = await User.findOne({cpf});
		if (hasUser) {
			return res.status(400).json(`User with CPF ${cpf} already exists`);
		}

		if (![UserTypes.admin, UserTypes.vendor, UserTypes.customer].includes(type)) {
			return res.status(400).json(`User type ${type} is invalid`);
		}

		if (vendorCnpj) {
			if (!isCNPJValid(vendorCnpj)) {
				return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
			}

			const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
			if (!hasVendor) {
				return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
			}
		}

		const newUser = new User(req.body);
		newUser.save((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(201).json(payload);
		});
	}

	public async update(req: Request, res: Response) {
		const {id} = req.params;
		const data: UserInterface = req.body;
		const {name, cpf, password, type, vendorCnpj} = data;

		const hasUser = await User.findById(id);
		if (!hasUser) {
			return res.status(404).json('User not found');
		}

		const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
		if (!nameRegex.test(name)) {
			return res.status(400).json('Invalid name');
		}

		if (password.length < 8) {
			return res.status(400).json('Password length must contains at least 8 characters');
		}

		if (!isCPFValid(cpf)) {
			return res.status(400).json(`CPF ${cpf} is invalid`);
		}

		if (![UserTypes.admin, UserTypes.vendor, UserTypes.customer].includes(type)) {
			return res.status(400).json(`User type ${type} is invalid`);
		}

		if (vendorCnpj) {
			if (!isCNPJValid(vendorCnpj)) {
				return res.status(400).json(`Vendor CNPJ ${vendorCnpj} is invalid`);
			}

			const hasVendor = await Vendor.findOne({cnpj: vendorCnpj});
			if (!hasVendor) {
				return res.status(404).json(`Vendor with CNPJ ${vendorCnpj} not found`);
			}
		}

		await User.findByIdAndUpdate(id, req.body, {new: true}, (error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async delete(req: Request, res: Response) {
		const {id} = req.params;

		const hasUser = await User.findById(id);
		if (!hasUser) {
			return res.status(404).json('User not found');
		}

		await User.findByIdAndDelete(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}
}

const controller: UsersController = new UsersController();
export {controller};
