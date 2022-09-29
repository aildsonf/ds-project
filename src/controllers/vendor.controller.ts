import { Request, Response } from "express";
import { Vendor, VendorInterface } from "../models/vendor.model";

// TODO: add validations
export class VendorController {
	public index(req: Request, res: Response) {
		Vendor.find((error, vendor) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(vendor)
		})
	}

	public view(req: Request, res: Response) {
		const {cnpj} = req.params;

		Vendor.findOne({cnpj}, undefined, (error, vendor) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(vendor)
		});
	}

	public async create(req: Request, res: Response) {
		const {cnpj} = req.body
		const hasVendor = await Vendor.findOne({cnpj});

		if(hasVendor) {
			return res.status(400).json(`Vendor with CNPJ ${cnpj} already exists`);
		}

		const newVendor = new Vendor(req.body);

		newVendor.save((error, vendor) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(201).json(vendor);
		});
	}

	public async update(req: Request, res: Response) {
		const {cnpj} = req.params;
		const hasVendor = await Vendor.findOne({cnpj});

		if(!hasVendor) {
			return res.status(404).json(`Vendor with CNPJ ${cnpj} not found`)
		}

		Vendor.findOneAndUpdate({cnpj}, req.body, {new: true}, (error, vendor) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(vendor);
		})
	}

	public delete(req: Request, res: Response) {
		const {cnpj} = req.params;

		Vendor.findOneAndDelete({cnpj}, undefined, (error, vendor) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(`Removed ${vendor?._id}`);
		});
	}
}

const controller: VendorController = new VendorController();
export {controller};
