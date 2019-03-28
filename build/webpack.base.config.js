const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    home: path.resolve(__dirname, '../src/pages/home/home.js'),
    list: path.resolve(__dirname, '../src/pages/list/list.js'),
    detail: path.resolve(__dirname, '../src/pages/detail/detail.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js'
  },
  resolve: {
    extensions: [" ", ".js", ".css", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' }, 
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}, 
      { test: /\.scss$/, use: [
          {loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader}, 
          {loader: 'css-loader'}, 
          {
            // css自动加前缀
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 3 versions']
                })  
              ]
            }
          },
          {loader: 'sass-loader'}
      ]}
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 多入口的html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/pages/home','home.html'),
      filename: 'home.html',
      chunks: ['home', 'vendor'],
      hash: true,
      inject: 'body', 
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/pages/detail','detail.html'),
      filename: 'detail.html',
      chunks: ['detail', 'vendor'],
      hash: true,
      inject: 'body', 
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'src/pages/list','list.html'),
      filename: 'list.html',
      chunks:['list', 'vendor'],
      hash: true,
      inject: 'body', 
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ]
}