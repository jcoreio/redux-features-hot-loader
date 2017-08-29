// @flow
/* eslint-env node */

var webpack = require('webpack')

const port = 8253

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:' + port + '/',
    'webpack/hot/only-dev-server',
    './client',
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /feature\.js$/,
        use: '../src/index',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
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
    publicPath: '/',
    stats: {
      colors: true,
    },
  },
}

