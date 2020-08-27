import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Loader } from 'webpack';

export const miniCssExtractPluginLoader = (PUBLIC_URL: string): Loader => ({
  loader: MiniCssExtractPlugin.loader,
  options: PUBLIC_URL.startsWith('.') ? { publicPath: '../../' } : {},
});
