import { Comment, NormalizedComment } from '../../../models';

export const normalizeComment = (comment: Comment): NormalizedComment => {
  const { body, email, name, id } = comment;

  return {
    id: Number(id),
    name,
    email,
    body,
  }
};
