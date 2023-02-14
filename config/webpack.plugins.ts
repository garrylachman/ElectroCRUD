import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack from 'webpack';
import { inDevelopment } from './webpack.helpers';

export const pluginsProduction = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
];

export const pluginsDevelopment = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new ReactRefreshPlugin(),
];

export const plugins = inDevelopment() ? pluginsDevelopment : pluginsProduction;
