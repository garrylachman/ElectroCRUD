import type { Configuration } from 'webpack';
import path from 'node:path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import { rules } from './webpack.rules';
import { sourceMainPath, sourceSharedPath } from './webpack.paths';

export const mainConfig: Configuration = {
  devtool: 'source-map',
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    main: [
      path.join(sourceMainPath, 'main.ts'),
      // path.join(sourceSharedPath, 'index.ts'),
    ],
    preload: path.join(sourceMainPath, 'preload.ts'),
  },
  externalsType: 'commonjs2',
  output: {
    filename: '[name].js',
  },
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: [new TsconfigPathsPlugins()],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),
  ],
};
