import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useState} from 'react';
import type {ProductType} from '../../components/ProductInfo';

const CreateProduct: NextPage = () => {
	const [name, setName] = useState('');
	const [barcode, setBarcode] = useState('');
	const [brand, setBrand] = useState('');
	const [weight, setWeight] = useState(0);
	const [amount, setAmount] = useState(0);
	const [price, setPrice] = useState(0);
	const [newProduct, setNewProduct] = useState<ProductType>();

	const handleSubmit = async () => {
		setNewProduct({
			name,
			barcode,
			brand,
			weight,
			amount,
			price,
		});

		await fetch('http://localhost:5000/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		}).catch(console.error);
	};

	return (
		<div className='mx-auto'>
			<Head>
				<title>Projeto SD</title>
			</Head>

			<header className='flex items-center justify-between bg-blue-300 px-2 py-4'>
				<h1 className='text-5xl font-medium'>Adicionar produto</h1>
			</header>

			<main>
				<div className='w-full py-4 border-b-2'>
					<form className='flex flex-col gap-4 mx-2'>
						<label htmlFor='name'>
              Nome:
							<input type='text' name='name' required className='ml-12 border-2 rounded-md' value={name} onChange={e => {
								setName(e.target.value);
							}}/>
						</label>

						<label htmlFor='barcode'>
              Cód. Barras:
							<input type='text' name='barcode' required className='ml-2 border-2 rounded-md' value={barcode} onChange={e => {
								setBarcode(e.target.value);
							}}/>
						</label>

						<label htmlFor='brand'>
              Marca:
							<input type='text' name='brand' className='ml-12 border-2 rounded-md' value={brand} onChange={e => {
								setBrand(e.target.value);
							}}/>
						</label>

						<label htmlFor='weight'>
              Peso:
							<input type='number' name='weight' className='ml-14 border-2 rounded-md' value={weight} onChange={e => {
								setWeight(e.target.valueAsNumber);
							}}/>
						</label>

						<label htmlFor='amount'>
              Qtd:
							<input type='number' name='amount' className='ml-16 border-2 rounded-md' value={amount} onChange={e => {
								setAmount(e.target.valueAsNumber);
							}}/>
						</label>

						<label htmlFor='price'>
              Preço:
							<input type='number' name='price' required className='ml-12 border-2 rounded-md' value={price} onChange={e => {
								setPrice(e.target.valueAsNumber);
							}}/>
						</label>
					</form>
				</div>

				<div className='flex p-4 justify-end w-full'>
					<button className='rounded-md shadow-md px-4 py-2 bg-blue-200 hover:bg-blue-400' onClick={handleSubmit}>Adicionar produto</button>
				</div>
			</main>
		</div>

	);
};

export default CreateProduct;

