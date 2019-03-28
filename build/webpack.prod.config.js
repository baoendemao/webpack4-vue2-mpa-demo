const path = require('path');
var webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  plugins: [
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, 
          comments: false 
        },
        compress: {
          warnings: false, 
          drop_console: true, 
          collapse_vars: true, 
          reduce_vars: true 
        }
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    })
  ],
  optimization: { 
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
});