const path = require('path');
const webpack = require("webpack");


module.exports = {
  mode: "development",
  name: "dev",
  entry: '/public/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  watch: true,
  devtool: "inline-source-map",
  devServer: {
    contentBase: './public',
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