import { Plugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const miniCssExtractPlugin = (): Plugin =>
	new MiniCssExtractPlugin({
		chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
		filename: 'static/css/[name].[contenthash:8].css',
	});
