import { Rule } from 'webpack';
import { urlLoader } from '../../loaders';

export const staticImageFormatRule = (limit: number): Rule => ({
  loader: urlLoader(),
  /*
   * options: {
   *   limit,
   *   name: 'static/media/[name].[hash:8].[ext]',
   * },
   */
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
});
