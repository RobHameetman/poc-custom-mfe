import { NormalizedPost } from '../../models';
import { fetchComments, fetchPosts, normalizePost } from '../../utils';

export const getPosts = async (): Promise<Array<NormalizedPost>> => {
  const comments = await fetchComments();
  const posts = await fetchPosts();

  if (!Array.isArray(posts)) {
    return [];
  }

  return posts.map(normalizePost(comments));
};