const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV;

const config = {
  entry: {
    awesome_components: './example/index',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  postcss: [autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9',
    ],
  })],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

module.exports = config;
