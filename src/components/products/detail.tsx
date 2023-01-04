import React from "react";
import { Product } from "../../graphql/products";

const ProductDetail = ({
  item: {
    title,
    price,
    imageURl,
    description,
  },
}: {
  item: Product;
}) => {
  return (
    <div className="product-detail">
      <p className="product-detail__title">{title}</p>
      <img className="product-detail__image" src={imageURl} />
      <p className="product-detail__description">{description}</p>
      <span className="product-detail__price">{price}</span>
    </div>
  );
};

export default ProductDetail;
