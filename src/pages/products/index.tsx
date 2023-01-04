import React from "react";
import { useQuery } from "react-query";
import ProductItem from "../../components/products/item";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const ProductList = () => {
  const { data } = useQuery<Products>(
    QueryKeys.PRODUCTS,
    () => graphqlFetcher(GET_PRODUCTS)
    // restFetcher({
    //   method: "GET",
    //   path: "/products",
    // })
  );

  console.log(data);

  return (
    <div>
      <h2>상품목록</h2>
      <ul className="products">
        {data?.products.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
