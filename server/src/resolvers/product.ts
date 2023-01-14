// schema에 정의한 것을 토대로 정의하는 곳 각각의 명령에 대해 적어주는 것

import { Resolvers } from './types';

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://picsum.photos/id/${i + 15}/200/150/`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1646767890123 + i * 1000 * 60 * 60 * 24).toString(),
  })))();

const productResolver:Resolvers = {
  Query: {
    products: (parent, args, context, info) => {
      return mockProducts;
    },
    product: (parent, { id }, context, info) => {
      const found = mockProducts.find((p) => p.id === id);
      return found || null;
    },
  },
  Mutation: {},
};

export default productResolver;
