const path = require('path');
const webpack = require("webpack");


module.exports = {
  mode: "development",
  name: "dev",
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public'),
  },
  entry: '/public/index.js',
  watch: true,
  target: 'node',
  devtool: "inline-source-map",
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