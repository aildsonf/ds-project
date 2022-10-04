import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import type {ProductType} from '../components/ProductInfo';
import {ProductInfo} from '../components/ProductInfo';

export type OrderType = {
	productId?: string;
	requiredAmount?: number;
};

const Main: NextPage = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [orders, setOrders] = useState<OrderType[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch('http://localhost:5000/products');
			const data = await res.json() as ProductType[];

			setProducts(data);
		};

		fetchProducts().catch(console.error);
	}, []);

	const handleOrderUpdate = ({productId, requiredAmount}: OrderType) => {
		const updatedOrders = [...orders];

		const index = orders.findIndex(entry => entry.productId === productId);
		if (index > -1) {
			updatedOrders[index] = {productId, requiredAmount};
		} else {
			updatedOrders.push({productId, requiredAmount});
		}

		setOrders(updatedOrders);
	};

	const handleOrderSubmit = async () => {
		const normalizedOrder = {
			seller_name: 'seller_name_test',
			seller_id: 'seller_id_test',
			seller_address: 'seller_address_test',
			seller_contact: 'seller_contact_test',
			provider: 'provider_test',
			products: orders,
			credit_card_number: '1111222233334444',
			cvv: '000',
		};

		// TODO: update pagamento module endpoint
		// await fetch('http://endpoint_pagamento', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(normalizedOrder),
		// }).catch(console.error);

		console.log(JSON.stringify(normalizedOrder));
	};

	return (
		<div className='mx-auto'>
			<Head>
				<title>Projeto SD</title>
			</Head>

			<header className='flex items-center justify-between bg-blue-300 p-4'>
				<h1 className='text-5xl font-medium'>Estoque</h1>

				<Link href='/create'>
					<button className='rounded-md shadow-md px-4 py-2 bg-white hover:bg-slate-200'>
				Adicionar produto
					</button>
				</Link>
			</header>

			<main>
				<div className='w-full border-b-2 p-4'>
					{products.map((product: ProductType, index: number) =>
						<ProductInfo product={product} handleOrderUpdate={handleOrderUpdate} key={index}/>,
					)}
				</div>

				<div className='flex p-4 justify-end'>
					<button className='rounded-md shadow-md px-4 py-2 bg-blue-200 hover:bg-blue-400' onClick={handleOrderSubmit}>Fazer pedido</button>
				</div>
			</main>
		</div>

	);
};

export default Main;
