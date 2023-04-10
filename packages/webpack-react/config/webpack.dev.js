const path = require('path')
const { dev } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')

module.exports = merge(dev, { entry: path.resolve(__dirname, '../src/index.tsx') })
