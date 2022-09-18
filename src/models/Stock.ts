export interface ItemInterface {
	reference: string;
	amount: number;
}

export interface StockInterface {
	items: ItemInterface[];
	addItem: (item: ItemInterface) => void;
}

export class Stock implements StockInterface {
	private _items: ItemInterface[];

	constructor() {
		this._items = [];
	}

	get items() {
		return this._items;
	}
	set items(items) {
		this._items = items;
	}

	public addItem(item: ItemInterface) {
		this._items.push(item);
	}
}
