// schema에 정의한 것을 토대로 정의하는 곳 각각의 명령에 대해 적어주는 것

import { Products, Resolvers } from './types';
import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from '../dbController';

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolvers = {
  Query: {
    products: (parent, { cursor = '', showDeleted = false }, { db }, info) => {
      const [hasCreatedAt, noCreatedAt] = [
        db.products.filter(product => !!product.createdAt).sort((a,b) => b.createdAt! - a.createdAt!),
        db.products.filter(product => !product.createdAt)
      ];
      const filteredDB = showDeleted ? [...hasCreatedAt, ...noCreatedAt] : hasCreatedAt;
      const fromIndex = filteredDB.findIndex((product) => product.id === cursor) + 1;
      return filteredDB.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((p) => p.id === id);
      return found || null;
    },
  },
  Mutation: {
    addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      };

      db.products.push(newProduct);
      setJSON(db.products);
      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error('없는 상품입니다.');
      }
      const updatedItem = {
        ...db.products[existProductIndex],
        ...data,
      };
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return updatedItem;
    },
    deleteProduct: (parent, { id }, { db }) => {
      // 실제 db에서 delete를 하는 대신 flag만 걸어준다. -> createdAt을 지운다.
      // sort, filter는 같은 옵션으로만 가능
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error('없는 상품입니다.');
      }
      const updatedItem = {
        ...db.products[existProductIndex],
      };
      delete updatedItem.createdAt;
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return id;
    },
  },
};

export default productResolver;
