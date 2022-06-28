const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

module.exports = (config, context) => {
  return merge(config, {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: resolve(context.options.sourceRoot, 'assets/**/*'),
            to: '../assets/[name].[ext]',
          },
          {
            from: resolve(context.options.sourceRoot, 'blocks/**/*'),
            to: '../blocks/[name].[ext]',
          },
          {
            from: resolve(context.options.sourceRoot, 'snippets/**/*'),
            to: '../snippets/[name].[ext]',
          },
        ],
      }),
    ],
  });
};
