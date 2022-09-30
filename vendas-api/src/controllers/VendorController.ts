import type {Request, Response} from 'express';
import {isCNPJValid} from '../helpers/validators';
import type {VendorInterface} from '../models/VendorModel';
import {Vendor} from '../models/VendorModel';

export class VendorController {
	public async index(req: Request, res: Response) {
		await Vendor.find((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async view(req: Request, res: Response) {
		const {id} = req.params;

		await Vendor.findById(id, undefined, (error, payload) => {
			if (error) {
				return res.status(500).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async create(req: Request, res: Response) {
		const data: VendorInterface = req.body;
		const {name, cnpj, address, contact} = data;

		if (!(name.length && address.length && contact.length)) {
			return res.status(400).json('Information must be provided');
		}

		if (!isCNPJValid(cnpj)) {
			return res.status(400).json(`CNPJ ${cnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj});
		if (hasVendor) {
			return res.status(400).json(`Vendor with CNPJ ${cnpj} already exists`);
		}

		const newVendor = new Vendor(data);
		newVendor.save((error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(201).json(payload);
		});
	}

	public async update(req: Request, res: Response) {
		const {id} = req.params;
		const data: VendorInterface = req.body;
		const {name, cnpj, address, contact} = data;

		if (!(name.length && address.length && contact.length)) {
			return res.status(400).json('Information must be provided');
		}

		if (!isCNPJValid(cnpj)) {
			return res.status(400).json(`CNPJ ${cnpj} is invalid`);
		}

		const hasVendor = await Vendor.findOne({cnpj});
		if (!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${cnpj} not found`);
		}

		await Vendor.findByIdAndUpdate(id, data, {new: true}, (error, payload) => {
			if (error) {
				return res.status(400).json(error);
			}

			return res.status(200).json(payload);
		});
	}

	public async delete(req: Request, res: Response) {
		const {id} = req.params;

		const hasVendor = await Vendor.findById(id);
		if (!hasVendor) {
			return res.status(404).json('Vendor not found');
		}

		await Vendor.findByIdAndDelete(id, undefined, (error, payload) => {
			if (error) {
				return res.status(404).json(error);
			}

			return res.status(200).json(payload);
		});
	}
}

const controller: VendorController = new VendorController();
export {controller};
