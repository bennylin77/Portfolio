const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: [
    //'react-hot-loader/patch',
    //'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "client/components"),
      containers: path.resolve(__dirname, "client/containers"),
      actions: path.resolve(__dirname, "client/actions"),
      //layout: path.resolve(__dirname, "client/components/layouts/layout.css")
    },
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoEmitOnErrorsPlugin(),
    //new webpack.NamedModulesPlugin()
    new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
    new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
            screw_ie8: true,
            keep_fnames: true
          },
          compress: {
            screw_ie8: true
          },
          comments: false
        })
  ]
};
