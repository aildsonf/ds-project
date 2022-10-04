import React, {useState} from 'react';
import type {OrderType} from '../pages';

export type ProductType = {
	_id?: string;
	name: string;
	barcode: string;
	brand?: string;
	weight?: number;
	amount?: number;
	price: number;
};

type ProductInfoProps = {
	product: ProductType;
	handleOrderUpdate: ({productId, requiredAmount}: OrderType) => void;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({product, handleOrderUpdate}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [requiredAmount, setRequiredAmount] = useState(0);

	const toggleIsExpanded = () => {
		setIsExpanded(prevState => !prevState);
	};

	const sumProductAmount = () => {
		const {_id: productId} = product;

		setRequiredAmount(prevState => prevState + 1);
		handleOrderUpdate({productId, requiredAmount});
	};

	const subProductAmount = () => {
		if (requiredAmount > 0) {
			const {_id: productId} = product;

			setRequiredAmount(prevState => prevState - 1);
			handleOrderUpdate({productId, requiredAmount});
		}
	};

	return (
		<>
			<div className='grid grid-flow-col items-center py-2 mx-2' >
				<p>{product.name}</p>
				<p>{product?.amount || 0} restante(s)</p>
				<p>${product.price}</p>

				<div className='grid grid-flow-col justify-items-center items-center'>
					<button className='rounded-md shadow-md px-4 py-2 bg-blue-200 hover:bg-blue-400' onClick={() => {
						subProductAmount();
					}}>-</button>

					<span>{requiredAmount}</span>

					<button className='rounded-md shadow-md px-4 py-2 bg-blue-200 hover:bg-blue-400' onClick={() => {
						sumProductAmount();
					}}>+</button>

					<button className='col-span-2 justify-self-end rounded-md shadow-md px-4 py-2 bg-blue-200 hover:bg-blue-400' onClick={toggleIsExpanded}>info</button>
				</div>
			</div>

			{isExpanded && (
				<table className='w-11/12 ml-4 my-8'>
					<thead>
						<tr className='text-left'>
							<th>Cód. Barras</th>
							<th>Nome</th>
							<th>Marca</th>
							<th>Peso</th>
							<th>Preço</th>
							<th>Qtd.</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>{product.barcode || '-'}</td>
							<td>{product.name || '-'}</td>
							<td>{product.brand || '-'}</td>
							<td>{product.weight || '-'}</td>
							<td>{product.price || '-'}</td>
							<td>{product.amount || '-'}</td>
						</tr>
					</tbody>
				</table>
			)}
		</>
	);
};

