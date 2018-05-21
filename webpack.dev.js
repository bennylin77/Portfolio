const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');


module.exports = merge({
  entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
          'DOMAIN': JSON.stringify('https://chi-lin.com'),
          'PORT': JSON.stringify('8081')
      }
    })
  ]
}, common );
