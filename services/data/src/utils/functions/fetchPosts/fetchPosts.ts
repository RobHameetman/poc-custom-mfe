import fetch from 'node-fetch';
import { config } from '../../../config';
import { Post } from '../../../models';

export const fetchPosts = async (): Promise<Array<Post> | Error> => {
  const response = await fetch(`${config.api.url}/posts`, {
    headers: {
      ...config.api.headers,
    },
  });
  
  return await response.json();
};
