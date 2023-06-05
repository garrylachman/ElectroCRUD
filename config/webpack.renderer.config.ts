/* eslint-disable unicorn/prefer-module */
import {
  Configuration,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
  ProvidePlugin,
} from 'webpack/lib';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import { rootPath } from './webpack.paths';

const rendererRules = [
  ...rules,
  {
    test: /\.s?(c|a)ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
        },
      },
      'sass-loader',
    ],
    include: /\.module\.s?(c|a)ss$/,
  },
  {
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /\.module\.s?(c|a)ss$/,
  },
  // Fonts
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  // Images
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  // SVG
  {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      },
      'file-loader',
    ],
  },
  // Markdown
  {
    test: /\.md$/,
    use: [
      {
        loader: 'raw-loader',
      },
    ],
  },
];

export const rendererConfig: Configuration = {
  devtool: 'source-map',
  module: {
    rules: rendererRules,
  },
  plugins: [
    ...plugins,
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      __dirname: rootPath,
    },
    plugins: [new TsconfigPathsPlugins()],
  },
};
