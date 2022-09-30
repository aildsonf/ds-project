import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export type ProductType = {
  name: string;
  barcode: string;
  brand?: string;
  weight?: number;
  price: number;
}

const Products: NextPage = () => {
  const [product, setProduct] = useState<ProductType>();

  const router = useRouter();
  const {productId} = router.query;

  console.log(productId);
  

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`http://localhost:5000/products/${productId}`);
      const data: ProductType = await response.json();
      
      setProduct(data);
    }

    fetchProducts();
  }, [productId]);

  return(
    <div>
        <div className='inline-block border-2 border-black'>
          <p>{product?.name}</p>
          <p>{product?.barcode}</p>
          <p>{product?.brand}</p>
          <p>{product?.weight}</p>
          <p>{product?.price}</p>
        </div>
    </div>
  )
}

export default Products;
