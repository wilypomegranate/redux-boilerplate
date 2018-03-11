const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
