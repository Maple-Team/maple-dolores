const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')

const { getPort, getPublicPath } = require('../../build/util')
const appName = 'sub'

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: getPort(appName),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  output: {
    libraryTarget: 'umd',
    globalObject: 'window',
    publicPath: getPublicPath(appName),
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
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    // new ModuleFederationPlugin({
    //   name: 'app2',
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './App': './src/App',
    //   },
    //   shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
