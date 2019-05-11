
module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hase:5]' : '[hase:5]',
      camelCase: true
    }
    // hotReload: false,//根据环境变量生成
    // loaders:{ //自定义模块及处理这些模块的loader
    //   'docs': docsLoader
    // },
    // preLoader: { //在使用loader处理之前,用这些自定义的loader进行处理
    //   // typeScript
    // }
    // postLoader  //在使用相应的loader处理之后,再使用这里定义的loader进行处理

  }
}
