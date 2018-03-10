const path = require('path');

module.exports = {
  entry: {
    app: './index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: ['babel-preset-env', 'react']
        }
      }
    }]
  }
};
