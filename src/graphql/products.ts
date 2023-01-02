import { gql } from "graphql-tag";

export type PRODUCT = {
  id: string;
  imageURl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
};

export type PRODUCTS = {
  products: PRODUCT[];
};

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageURl
    price
    title
    description
    createdAt
  }
`;

export default GET_PRODUCTS;
