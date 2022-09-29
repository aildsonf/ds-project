import { Request, Response } from "express";
import { User, UserInterface } from "../models/user.model";

// TODO: add verifications
class UsersController {
	public index(req: Request, res: Response) {
		User.find((error, users) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(users)
		})
	}

	public view(req: Request, res: Response) {
		const {cpf} = req.params;

		User.findOne({cpf}, undefined, (error, user) => {
			if(error) {
				return res.status(404).json(error);
			}
			return res.status(200).json(user)
		});
	}

	public async create(req: Request, res: Response) {
		const {cpf} = req.body
		const hasUser = await User.findOne({cpf});

		if(hasUser) {
			return res.status(400).json(`User with CPF ${req.body.cpf} already exists`);
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
		const {cpf} = req.params;
		const hasUser = await User.findOne({cpf});

		if(!hasUser) {
			return res.status(404).json(`User with CPF ${cpf} not found`)
		}

		User.findOneAndUpdate({cpf}, req.body, {new: true}, (error, user) => {
			if(error) {
				return res.status(400).json(error);
			}
			return res.status(200).json(user);
		})
	}

	public delete(req: Request, res: Response) {
		const {cpf} = req.params;

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
