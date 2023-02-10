import type { Configuration } from 'webpack';
import path from 'node:path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import { rules } from './webpack.rules';
import { sourceMainPath, sourceSharedPath } from './webpack.paths';
import TerserPlugin from 'terser-webpack-plugin';

export const mainConfig: Configuration = {
  devtool: 'source-map',
  target: 'electron-main',
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: path.join(sourceMainPath, 'index.ts'),
  externalsType: 'commonjs',
  externals: {
    'mock-aws-s3': 'mock-aws-s3',
    'aws-sdk': 'aws-sdk',
    nock: 'nock',
    oracledb: 'oracledb',
    'pg-native': 'pg-native',
  },
  // Put your normal webpack config below here
  module: {
    exprContextCritical: false,
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.mjs'],
    plugins: [new TsconfigPathsPlugins()],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),
  ],
};
