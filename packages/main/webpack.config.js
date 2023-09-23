const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { ModuleFederationPlugin } = require('webpack').container
// const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')
const path = require('path')

const { getPort, getPublicPath } = require('../../build/util')
const appName = 'main'

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-cheap-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: getPort(appName),
    historyApiFallback: true,
  },
  output: {
    publicPath: getPublicPath(appName),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 244 * 1024,
      maxAsyncSize: 244 * 1024,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // new ModuleFederationPlugin({
    //   name: "app1",
    //   remotes: {
    //     app2: "app2@[app2Url]/remoteEntry.js",
    //   },
    //   shared: {react: {singleton: true}, "react-dom": {singleton: true}},
    // }),
    // new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
