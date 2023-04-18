const path = require('path')
const { dev } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')

module.exports = merge(dev, {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  experiments: {
    lazyCompilation: false,
  },
})
