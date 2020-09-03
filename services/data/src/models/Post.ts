import { NormalizedComment } from './Comment';

export interface Post {
  readonly userId: string;
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface NormalizedPost {
  id: number;
  title: string;
  body: string;
  comments: Array<NormalizedComment>;
}
