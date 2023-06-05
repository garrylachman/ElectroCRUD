import path from 'node:path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import { rules } from './webpack.rules';
import { sourceMainPath } from './webpack.paths';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration, IgnorePlugin } from 'webpack/lib';

export const mainConfig: Configuration = {
  devtool: 'source-map',
  target: 'electron-main',
  entry: path.join(sourceMainPath, 'index.ts'),
  externalsType: 'commonjs',
  externals: {
    'mock-aws-s3': 'mock-aws-s3',
    'aws-sdk': 'aws-sdk',
    nock: 'nock',
    oracledb: 'oracledb',
    'pg-native': 'pg-native',
    'better-sqlite3': 'better-sqlite3',
    'cpu-features': 'cpu-features',
  },
  module: {
    exprContextCritical: false,
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.mjs'],
    plugins: [new TsconfigPathsPlugins()],
  },
  optimization: {
    minimize: true,
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),
    ],
  },
  plugins: [
    new IgnorePlugin({
      resourceRegExp: /^cloudflare:sockets$/,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),
  ],
};
