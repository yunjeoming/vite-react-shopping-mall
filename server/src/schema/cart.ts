import { gql } from 'apollo-server-express';

const cartSchema = gql`
  type CartItem {
    id: ID!
    amount: Int!
    product: Product!
  }

  extend type Query {
    cart: [CartItem!]
    product(id: ID!): Product!
  }

  extend type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    executePay(ids: [ID!]): [ID!]
  }
`

export default cartSchema