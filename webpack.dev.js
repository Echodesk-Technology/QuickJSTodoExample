const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const PORT = 8060 || process.env.PORT;

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
  plugins: [
    new BrowserSyncPlugin({
        // browse to http://localhost:8061/ during development
        host: 'localhost',
        port: PORT,
        // proxy the Express Server endpoint
        // through BrowserSync
        proxy: `http://localhost:${PORT}`,
        open: false,
        notify: false,
      },
      {
        reload: true
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
  }
};