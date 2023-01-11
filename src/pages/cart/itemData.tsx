import React from 'react';
import { CartType } from '../../graphql/cart';

const ItemData = ({ imageUrl, price, title }: Pick<CartType, 'imageUrl' | 'price' | 'title'>) => {
  return (
    <div className="cart-item">
      <img className="cart-item__image" src={imageUrl} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
    </div>
  );
};

export default ItemData;
