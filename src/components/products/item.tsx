import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../graphql/products';
import { useRecoilState } from 'recoil';
import { cartItemSelector } from '../../recoils/cart';

const ProductItem = ({ id, imageUrl, price, title, description, createdAt }: Product) => {
  const [cartAmount, setCartAmount] = useRecoilState(cartItemSelector(id));
  const addTocart = () => setCartAmount((cartAmount || 0) + 1);
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <img className="product-item__image" src={imageUrl} />
        <span className="product-item__price">{price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={addTocart}>
        담기
      </button>
      <span>{cartAmount || 0}</span>
    </li>
  );
};

export default ProductItem;
