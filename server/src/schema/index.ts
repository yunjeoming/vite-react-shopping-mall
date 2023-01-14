import { gql } from 'apollo-server-express';
import productSchema from './products';
import cartSchema from './cart';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

// Query, Mutation 안에 아무것도 없으면 자체 실행이 되지 않기 때문에 임의의 무언가를 적어줌,,!

export default [linkSchema, productSchema, cartSchema];
