const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devServer: {
    inline: true,
    progress: true,
    port: 8888,
    historyApiFallback: true,
    compress: true, 
    proxy: {
      '/api': {
        // 配置dev环境下的接口跨域
        // 这里需要修改成接口的ip和端口号
        target: 'http://10.11.22.33:18888',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  watchOptions: {
    ignored: /node_modules/, 
    aggregateTimeout: 500,
    poll: 1000 
  },
  plugins: [
    new webpack.NamedModulesPlugin() 
  ]
});