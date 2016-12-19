// @flow
/* eslint-env node */

var webpack = require('webpack')

const port = 8253

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + port + '/',
    'webpack/hot/dev-server',
    './client',
  ],
  output: {
    file: 'bundle.js',
    path: __dirname,
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      {
        test: /feature\.js$/,
        loader: '../src/index',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch: true,
  devServer: {
    contentBase: __dirname,
    noInfo: true,
    port: port, // eslint-disable-line object-shorthand
    hot: true,
    stats: {
      colors: true,
    },
  },
}

