const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    /*
    * index.html为当前目录创建的template.html
    */
    index: '/index.html'
  }
}
let config
if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            // {
            //   loader:'css-loader',
            //   options: {
            //     module: true,
            //     localIdentName: isDev? '[path]-[name]-[hase:5]':'[hase:5]',
            //   }
            // },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPluins.concat([
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
      // new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
      //   name: 'vendor'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
      //   name: 'runtime'
      // })
    ])
  })
}

module.exports = config
