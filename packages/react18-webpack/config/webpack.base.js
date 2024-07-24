const { base } = require('@liutsing/webpack-config')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
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
            options: {
              // working?
              cacheDirectory: false, // 这里禁止缓存
              cacheCompression: false,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    ...base.resolve,
    alias: {
      process: 'process/browser',
    },
    fallback: { 'process/browser': require.resolve('process/browser') },
  },
}

module.exports = config
