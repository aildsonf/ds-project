import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'

export type ProductType = {
  name: string;
  barcode: string;
  brand?: string;
  weight?: number;
  price: number;
}

const Products: NextPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:5000/products');
      const data: ProductType[] = await response.json();
      
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return(
    <div>
      {products.map((product, index) => 
        <div key={index} className='inline-block border-2 border-black'>
          <p>{product.name}</p>
          <p>{product.barcode}</p>
          <p>{product.brand}</p>
          <p>{product.weight}</p>
          <p>{product.price}</p>
        </div>
      )}
    </div>
  )
}

export default Products;
