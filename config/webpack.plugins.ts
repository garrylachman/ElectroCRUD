import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { inDevelopment } from './webpack.helpers';
import { IgnorePlugin, HotModuleReplacementPlugin } from 'webpack/lib';

export const pluginsProduction = [
  new IgnorePlugin({
    resourceRegExp: /^cloudflare:sockets$/,
  }),
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
];

export const pluginsDevelopment = [
  new IgnorePlugin({
    resourceRegExp: /^cloudflare:sockets$/,
  }),
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new HotModuleReplacementPlugin(),
  new ReactRefreshPlugin(),
];

export const plugins = inDevelopment() ? pluginsDevelopment : pluginsProduction;
