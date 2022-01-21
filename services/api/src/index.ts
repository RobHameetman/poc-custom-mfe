import { ApolloServer } from 'apollo-server';
import { config } from './config';
import { resolvers } from './resolvers';
import typeDefs from './typeDefs.graphql';

(async (): Promise<void> => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cacheControl: false,
    });

    await server.listen(config.port);

    console.info(`🚀 Graphql server is running at https://localhost:${config.port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
