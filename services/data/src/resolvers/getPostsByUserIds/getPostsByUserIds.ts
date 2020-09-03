import { fetchComments, fetchPosts, normalizePost } from '../../utils';
import { NormalizedPost } from '../../models';

export interface GetPostsByUserIdsInput {
  ids: string;
}

export const getPostsByUserIds = async (_: void, { ids }: GetPostsByUserIdsInput ): Promise<Array<NormalizedPost>> => {
  const normalizedIds = ids.split(',').map(Number);

  if (normalizedIds.some(id => isNaN(id))) {
    throw new Error('getPostsByUserIds() received an invalid ID. Please make sure all IDs are integers.');
  }

  const comments = await fetchComments();
  const posts = await fetchPosts();

  if (posts instanceof Error) {
    throw new Error(posts.message);
  }

  return posts
    .filter(({ userId }) => normalizedIds.includes(Number(userId)))
    .map(normalizePost(comments));
};