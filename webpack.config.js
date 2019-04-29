const path =  require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
/**
 * package.json中在script中设置的命令行变量都是存在process.env中，
 * 可由 process.env.变量名 来获取变量
 */
const isDev = process.env.NODE_ENV === 'development'
const config = {
  entry : path.join(__dirname , 'src/index.js'),
  output: {
    filename : 'bundle.js',
    path : path.join(__dirname, 'dist')
  },
  module : {
    rules : [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader' ,  //将css内容写入html里面，在js中，以一段js 代码出现，作用是将样式写入html中
          'css-loader'  //在css文件中，将内容读出来
        ]
        // loader : 'css-loader'
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ] 
      },
      {
        test: /\.(gif|jpg|jpeg|peg|svg)$/,
        use : [
          {
            loader: 'url-loader', 
            /**
             * url-loader作用：可以将图片转换成base64的代码，直接写入js内容中，不用生成一个新的文件，减少http请求，
             * url-loader封装了file-loader，而file-loader的作用是 读取图片、简单处理后，将图片文件重新换个名字、换个地方进行存储
             */
            options: {
              limit : 1024, //大小 小于1024 ，则转义成base64的代码写入代码中，减少请求
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /**
     * 使用了这个plugin时，定义了process.env,在js代码中，是可以引用得到的
     * 区分了所使用的包（如vue）的不同版本模式，使用到的源码
     */
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if(isDev){
  //soure-map 代码的映射 ——最完整的映射
  config.devtool = '#cheap-module-eval-source-map' ; //这个模式是效率最高，映射情况也是最佳
  // webpack 2.0之后才有devServer这个配置项
  config.devServer = {
    port: 8000,
    host: '0.0.0.0' ,// 这样设置可以由127.0.0.1 访问，也可以由 本机的内网ip进行访问。
    overlay: {
      errors : true,
    },
    // open : true,  //每次打包完，会自动打开一个浏览器窗口
    // historyFallback: { }
    /**
     * hot module replacement 
     * 改了一个组件的数据，则只有更新这个组件的视图
     * 加这个配置，则会刷新整个页面的信息
     */
    hot : true ,
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin() ,
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config