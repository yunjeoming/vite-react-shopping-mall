import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// 서버 2개
import schema from './schema';
import resolvers from './resolvers';
import { DBField, readDB } from './dbController';

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db:{
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART)
      }
    },
  });
  // json 데이터를 apollo server에서 불러온 것 그대로를 계속 사용함. 즉 변경된 내용을 다시 json에 적용하는 작업이 필요함

  const app = express();
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:5173', 'https://studio.apollographql.com'],
      credentials: true,
    },
  });
  await app.listen({
    port: 8000,
  });

  console.log('server listening on 8000...')
})();
