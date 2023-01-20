// schema에 정의한 것을 토대로 정의하는 곳 각각의 명령에 대해 적어주는 것

import { Resolvers } from './types';

const productResolver: Resolvers = {
  Query: {
    products: (parent, { cursor = '' }, { db }, info) => {
      const fromIndex = db.products.findIndex(product => product.id === cursor) + 1;
      return db.products.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((p) => p.id === id);
      return found || null;
    },
  },
  Mutation: {},
};

export default productResolver;
