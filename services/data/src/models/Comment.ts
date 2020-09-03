import { Post } from './Post';

export interface Comment {
  readonly postId: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export interface NormalizedComment {
  id?: number;
  name?: string;
  email?: string;
  body?: string;
  post?: Post;
}
