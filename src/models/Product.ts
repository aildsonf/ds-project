export type ProductInterface = {
	id: string;
	name: string;
	type: string;
	brand: string;
	weight: number;
	price: number;
};

export class Product implements ProductInterface {
	private _id: string;
	private _name: string;
	private _type: string;
	private _brand: string;
	private _weight: number;
	private _price: number;

	constructor(product: ProductInterface) {
		this._id = product.id;
		this._name = product.name;
		this._type = product.type;
		this._brand = product.brand;
		this._weight = product.weight;
		this._price = product.price;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
	}

	get type() {
		return this._type;
	}

	set type(type: string) {
		this._type = type;
	}

	get brand() {
		return this._brand;
	}

	set brand(brand: string) {
		this._brand = brand;
	}

	get weight() {
		return this._weight;
	}

	set weight(weight: number) {
		this._weight = weight;
	}

	get price() {
		return this._price;
	}

	set price(price: number) {
		this._price = price;
	}
}
