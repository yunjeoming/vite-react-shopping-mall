import React from 'react';
import { Product } from '../../graphql/products';
import ProductItem from './item';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul className="products">
      {products.map((product) => (
        <ProductItem {...product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductList;
