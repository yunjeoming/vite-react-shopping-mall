import { DBField, writeDB } from '../dbController';
import { Cart, Resolvers } from './types';

// schema에 정의한 것을 토대로 정의하는 곳 각각의 명령에 대해 적어주는 것

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolvers = {
  Query: {
    cart: (parent, args, { db }) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw Error('상품 id가 없다');

      const targetProduct = db.products.find((item) => item.id === id);
      if (!targetProduct) throw new Error('상품이 없습니다.');

      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartIndex].amount + 1,
        };
        db.cart.splice(existCartIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }

      const newItem = {
        id,
        amount: 1,
        product: targetProduct,
      };
      db.cart.push(newItem);
      setJSON(db.cart);
      return newItem;
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다~');
      }
      const newCartItem = {
        id,
        amount,
      };
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다~');
      }

      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);
      return id;
    },
    executePay: (parent, { ids }, {db}) => {
      const newCartData = db.cart.filter((item) => !ids.includes(item.id));
      if (newCartData.some(item => {
        const product = db.products.find((product: any) => product.id === item.id);
        return !product?.createdAt
      })) throw new Error('삭제된 상품이 포함되어 결제를 할 수 없습니다.')
      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) => db.products.find((product: any) => product.id === cartItem.id),
  },
};

export default cartResolver;
