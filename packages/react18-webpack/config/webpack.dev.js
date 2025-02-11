const { getPort } = require('@liutsing/config')

const path = require('path')
const { dev } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')

const webpack = require('webpack')
const base = require('./webpack.base')

const appName = require('../package.json').name

/**
 * @type {import('webpack').Configuration}
 */
const config = merge(base, dev, {
  entry: path.resolve(__dirname, '../src/main.tsx'),
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length,
            },
          },
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

  devServer: {
    ...dev.devServer,
    historyApiFallback: true,
    port: getPort(appName),
  },
})

module.exports = config
