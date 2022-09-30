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

      console.log(data);
      
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return(
    <div>
      {products.map((product, index) => 
        <div key={index}>q</div>
      )}
    </div>
  )
}

export default Products;
