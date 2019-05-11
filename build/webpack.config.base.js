const path = require('path')
// const { VueLoaderPlugin } = require('vue-loader')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'developemt'

const config = {
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|peg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              /**
               * 大小 小于1024 ，则转义成base64的代码写入代码中，减少请求
               */
              limit: 1024,
              // name: 'resources/[path][name].[hash:8].[ext]'
              name: 'resources/[path][name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
