const { base } = require('@liutsing/webpack-config')
const { getPublicPath } = require('@liutsing/config')
const isDevelopment = process.env.NODE_ENV !== 'production'
const appName = require('../package.json').name

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
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192,
        //     },
        //   },
        // ],
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
}

module.exports = config
