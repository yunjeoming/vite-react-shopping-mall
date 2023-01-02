import React from "react";
import { Link } from "react-router-dom";
import { PRODUCT } from "../../graphql/products";

const ProductItem = ({
  id,
  imageURl,
  price,
  title,
  description,
  createdAt,
}: PRODUCT) => {
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">{title}</p>
        <p className="product-item__description">{description}</p>
        <img className="product-item__image" src={imageURl} />
        <span className="product-item__price">{price}</span>
        <span className="product-item__createdAt">{createdAt}</span>
      </Link>
    </li>
  );
};

export default ProductItem;
