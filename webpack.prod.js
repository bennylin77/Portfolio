const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'PORT': JSON.stringify('80')
      }
    })
  ]
})
/*
module.exports = {
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoEmitOnErrorsPlugin(),
    //new webpack.NamedModulesPlugin()
    //new webpack.LoaderOptionsPlugin({
    //      minimize: true,
    //      debug: false
    //    }),
    new UglifyJSPlugin()
  ]
};
*/
