import { Request, Response } from "express";
import { User } from "../models/User";

// TODO: implement database
const users: User[] = [];

export class UsersController {
	public index(req: Request, res: Response) {
		return res.status(200).json(users);
	}

	public view(req: Request, res: Response) {
		const { login } = req.params;
		const user = users.find((user) => user.login === login);

		if (!user) {
			return res.status(404).json("user not found");
		}

		return res.status(200).json(user);
	}

	public create(req: Request, res: Response) {
		const { login, password, adminRights, status }: User = req.body;
		const hasUser = Boolean(users.find((user) => user.login === login));

		if (!(login && password)) {
			return res.status(400).json("missing required params");
		} else if (hasUser) {
			return res.status(400).json("user already exists");
		}

		const user = new User({ login, password, adminRights, status });

		// TODO: create user
		users.push(user);

		return res.status(201).json(user);
	}

	public update(req: Request, res: Response) {
		const { login, password, adminRights, status }: User = req.body;
		const user = users.find((user) => user.login === login);

		if (!user) {
			return res.status(404).json("user not found");
		}

		const _login = login || user.login;
		const _password = password || user.password;
		const _adminRights = adminRights || user.adminRights;
		const _status = status || user.status;

		// TODO: update user
		return res.status(200).json({
			_login,
			_password,
			_adminRights,
			_status,
		});
	}

	public delete(req: Request, res: Response) {
		const { login } = req.params;
		const user = users.find((user) => user.login === login);

		if (!user) {
			return res.status(404).json("user not found");
		}

		// TODO: remove user
		return res.status(200).json(user);
	}
}
