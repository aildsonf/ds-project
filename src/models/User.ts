export enum UserRole {
	ADMIN = "admin",
	COLLABORATOR = "collaborator",
	CUSTOMER = "customer"
}

export interface UserInterface {
	login: string;
	password: string;
	role: UserRole;
}

export class User implements UserInterface {
	private _login: string;
	private _password: string;
	private _role: UserRole;

	constructor(login: string, password: string, role: UserRole) {
		this._login = login;
		this._password = password;
		this._role = role;
	}

	get login(): string {
		return this._login;
	}
	set login(login: string) {
		this._login = login;
	}

	get password(): string {
		return this._password;
	}
	set password(password: string) {
		this._password = password;
	}

	get role(): UserRole {
		return this._role;
	}
	set role(role: UserRole) {
		this._role = role;
	}
}
