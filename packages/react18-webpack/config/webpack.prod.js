const { prod } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
const config = merge(base, prod, {
  entry: path.resolve(__dirname, '../src/main.tsx'),
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          minSize: 1000,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin({})],
  output: base.output,
})

module.exports = config
