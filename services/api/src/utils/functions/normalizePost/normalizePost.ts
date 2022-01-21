import { normalizeComment } from '../normalizeComment';
import { Comment, NormalizedPost, Post } from '../../../models';

export const normalizePost =(comments: Array<Comment> = []) =>
  (post: Post): NormalizedPost => {
    const { body, id, title } = post;

    return {
      id: Number(id),
      title,
      body,
      comments: comments
        .filter(({ postId }) => postId === id)
        .map(normalizeComment),
    }
  };
