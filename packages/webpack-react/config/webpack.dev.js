const path = require('path')
const webpack = require('webpack')
const { dev } = require('@liutsing/webpack-config')
const { merge } = require('webpack-merge')

const config = merge(dev, {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  experiments: {
    lazyCompilation: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        sideEffects: true,
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          priority: 20,
          minChunks: 6,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    alias: {
      // NOTE 因依赖调试本地的@liutsing/rc-components, 确保同一份react/react-dom
      react: '/root/maple/base/node_modules/react',
      'react-dom': '/root/maple/base/node_modules/react-dom',
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.join(__dirname, '../dll', 'vendor-manifest.json'),
    }),
  ],
})

module.exports = config
