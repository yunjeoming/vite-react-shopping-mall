import { Resolvers } from './types';

// schema에 정의한 것을 토대로 정의하는 곳 각각의 명령에 대해 적어주는 것
const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://picsum.photos/id/${i + 15}/200/150/`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1646767890123 + i * 1000 * 60 * 60 * 24).toString(),
  })))();

let cartData = [
  { id: 1, amount: 1 },
  { id: 2, amount: 2 },
];

const cartResolver:Resolvers = {
  Query: {
    cart: (parent, args, context, info) => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (parent, { id }, context, info) => {
      const newCartData = [...cartData];
      const targetProduct = mockProducts.find((item) => item.id === id);

      if (!targetProduct) throw new Error('상품이 없습니다.');

      const newItem = {
        ...targetProduct,
        amount: (newCartData[id]?.amount || 0) + 1,
      };
      // newCartData[id] = newItem;
      cartData = newCartData;

      return newItem;
    },
    updateCart: (parent, { id, amount }, context, info) => {
      const newData = { ...cartData };
      if (!newData[id]) {
        throw new Error('없는 데이터입니다~');
      }
      const newItem = {
        ...newData[id],
        amount,
      };
      newData[id] = newItem;
      cartData = newData;
      return newItem;
    },
    deleteCart: (parent, { id }, context, info) => {
      const newData = { ...cartData };
      delete newData[id];
      cartData = newData;
      return id;
    },
    executePay: (parent, { ids }, context, info) => {
      const newCartData = cartData.filter((item) => !ids.includes(item.id));
      cartData = newCartData;
      return ids;
    },
  },
};

export default cartResolver
