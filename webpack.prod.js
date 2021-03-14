const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require("webpack")


module.exports = {
  mode: "production",
  name: "prod",
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  entry: '/public/index.js',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.resolve(__dirname, 'public', 'index.html'),
    })
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['@babel/plugin-transform-react-jsx', { pragma: "Quick.createElement" }]]
          }
        }
      },
    ]
  }
}