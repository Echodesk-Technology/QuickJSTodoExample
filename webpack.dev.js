const path = require('path');
const webpack = require("webpack");


module.exports = {
  mode: "development",
  name: "dev",
  entry: './dist/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
    port: 8060,
  },
  plugins: [
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
  }
};