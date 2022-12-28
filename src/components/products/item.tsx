import React from "react";
import { Product } from "../../types";

const ProductItem = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) => {
  return (
    <li className="product-item">
      <p className="product-item__category">{category}</p>
      <img className="product-item__image" src={image} />
      <span className="product-item__price">{price}</span>
      <span className="product-item__rating">{rating.rate}</span>
    </li>
  );
};

export default ProductItem;
