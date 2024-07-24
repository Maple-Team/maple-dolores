const path = require('path')
const { dev } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')
const { getPublicPath, getPort } = require('../../../build/util')
const webpack = require('webpack')
const base = require('./webpack.base')

const isDevelopment = process.env.NODE_ENV !== 'production'
const appName = 'react18-webpack'

const config = merge(base, dev, {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // working?
              cacheDirectory: false, // 这里禁止缓存
              cacheCompression: false,
            },
          },
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'react18',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       priority: 20,
    //       minChunks: 6,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
  },
  output: {
    // 开发环境设置 true 将会导致热更新失效
    clean: isDevelopment ? false : true,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // 需要配置成 umd 规范
    libraryTarget: 'umd',
    // 修改不规范的代码格式，避免逃逸沙箱
    globalObject: 'window',
    // 保证子应用的资源路径变为绝对路径
    publicPath: getPublicPath(appName),
  },
  devServer: {
    ...dev.devServer,
    historyApiFallback: true,
    port: getPort(appName),
  },
})

module.exports = config
