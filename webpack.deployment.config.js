const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
