const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const prod = require('./webpack.prod')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(prod, {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  plugins: [
    new BundleAnalyzerPlugin({
      open: false,
      openAnalyzer: false,
      analyzerPort: 8888,
    }),
  ],
})
