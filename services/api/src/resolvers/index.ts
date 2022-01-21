import { getPosts } from './getPosts';
import { getPostsByUserIds } from './getPostsByUserIds';

export const resolvers = {
  Query: {
    getPosts,
    getPostsByUserIds,
  },
};
