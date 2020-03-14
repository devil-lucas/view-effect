const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../example/index.html'),
    }),
  ],
  devServer: {
    port: 9001,
    open: true,
  },
};