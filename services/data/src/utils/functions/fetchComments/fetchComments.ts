import fetch from 'node-fetch';
import { config } from '../../../config';
import { Comment } from '../../../models';

export const fetchComments = async (): Promise<Array<Comment>> => {
  const response = await fetch(`${config.api.url}/comments`, {
    headers: {
      ...config.api.headers,
    },
  });
  
  return await response.json();
};
