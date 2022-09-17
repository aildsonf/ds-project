export interface ProductInterface {
	id: string;
	name: string;
	type: string;
	brand: string;
	weight: number;
	price: number;
}

export class Product implements ProductInterface {
	private _id: string;
	private _name: string;
	private _type: string;
	private _brand: string;
	private _weight: number;
	private _price: number;

	constructor(id: string, name: string, type: string, brand: string, weight: number, price: number) {
		this._id = id,
		this._name = name,
		this._type = type;
		this._brand = brand,
		this._weight = weight;
		this._price = price;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}
	set name(name: string) {
		this._name = name;
	}

	get type(): string {
		return this._type;
	}
	set type(type: string) {
		this._type = type;
	}

	get brand(): string {
		return this._brand;
	}
	set brand(brand: string) {
		this._brand = brand;
	}

	get weight(): number {
		return this._weight;
	}
	set weight(weight: number) {
		this._weight = weight;
	}

	get price(): number {
		return this._price;
	}
	set price(price: number) {
		this._price = price;
	}
}

