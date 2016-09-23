const HTMLWebpackPlugin = require('html-webpack-plugin');
const { root, stripUnused, only } = require('./helpers');
const webpack = require('webpack');

module.exports = (env) => ({
  context: root('./src'),
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  entry: !env.test ? {
    app: './index.jsx',
  } : undefined,

  output: {
    path: root('./dist'),
    filename: '[name].bundle.js',
    pathinfo: !env.prod, // should include path name comment for every import
  },

  devtool: env.prod ? 'source-map' : 'eval-source-map',
  bail: env.prod, // abort compilation on first error
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: stripUnused([
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          only(env.prod, 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'),
        ]),
      },
      {
        test: /\.scss/,
        loaders: ['to-string', 'css', 'resolve-url', 'sass?sourceMaps'],
      },
    ],
  },

  plugins: !env.test ? stripUnused([
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    only(env.prod, new webpack.optimize.UglifyJsPlugin),
    only(env.prod, new webpack.LoaderOptionsPlugin({
      debug: false,
    })),
    only(env.prod, new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    })),
  ]) : [],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    aggregateTimeout: 300,
    poll: 1000,
  },
});
