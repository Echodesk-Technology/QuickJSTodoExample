const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  name: "prod",
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  entry: '/dist/index.js',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ]
  },
}