import React from 'react';
import { Product } from '../../graphql/products';
import ProductItem from './item';

const ProductList = ({ list, Item }: { 
  list: {
    products: Product[]
  }[],
  Item: ({ id, imageUrl, price, title, description, createdAt }: Product) => JSX.Element
}) => {
  return (
    <ul className="products">
      {list.map(page => page.products.map((product) => (
        <Item {...product} key={product.id} />
      )))}
    </ul>
  );
};

export default ProductList;
