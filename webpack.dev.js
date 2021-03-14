const path = require('path');
const webpack = require("webpack")
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
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8060,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'development',
    }),
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
        },
      },
    ]
  }
};