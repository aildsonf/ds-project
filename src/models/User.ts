export enum UserStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
}

export type UserInterface = {
	login: string;
	password: string;
	adminRights?: boolean;
	status?: UserStatus;
};

export class User implements UserInterface {
	private _login: string;
	private _password: string;
	private _adminRights: boolean;
	private _status: UserStatus;

	constructor(user: UserInterface) {
		this._login = user.login;
		this._password = user.password;
		this._adminRights = user?.adminRights || false;
		this._status = user?.status || UserStatus.ACTIVE;
	}

	get login() {
		return this._login;
	}

	set login(login: string) {
		this._login = login;
	}

	get password() {
		return this._password;
	}

	set password(password: string) {
		this._password = password;
	}

	get adminRights() {
		return this._adminRights;
	}

	set adminRights(adminRights: boolean) {
		this._adminRights = adminRights;
	}

	get status() {
		return this._status;
	}

	set status(status: UserStatus) {
		this._status = status;
	}
}
