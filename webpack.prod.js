const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack");

module.exports = {
  mode: "production",
  name: "prod",
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  entry: '/public/index.js',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      title: path.dirname(__filename).split(path.sep).pop(),
      filename: "index.html",
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  },
}