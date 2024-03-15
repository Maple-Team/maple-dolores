const { prod } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(prod, {
  entry: path.resolve(__dirname, '../src/index.tsx'),
})
