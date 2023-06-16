const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['react', 'react-dom', '@antv/g2plot'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.join(__dirname, '../dll'),
    library: 'vendor_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: path.join(__dirname, '../dll', 'vendor-manifest.json'),
    }),
  ],
}
