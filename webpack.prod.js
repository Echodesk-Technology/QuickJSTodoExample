const path = require('path');
const webpack = require("webpack")


module.exports = {
    mode: "production",
    name: "prod",
    output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js/'),
  },
  entry: '/public/index.js',
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
    }),
  ],
  devtool: 'source-map',
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
      }
    ]
  }
}