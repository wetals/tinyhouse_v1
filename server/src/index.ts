require('dotenv').config();
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './grapgql';
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';

const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  server.applyMiddleware({ app, path: '/api' });

  app.listen(port);

  console.log(`[ app ] : http://localhost:/${port}`);
};

mount(express());
