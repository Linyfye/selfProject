import Vue from 'vue'

// const div = document.createElement('div')
// document.body.appendChild(div)

new Vue({
  /**
   * 配置了template.html之后，只需要将页面写的div 的id值放入el中。
   * template.html的配置方法：
   *  1）在文件夹build中引入一个空的html文件
   *  2）在 webpack.config.pratice.js 中的 HtmlPlugin 中配置 template 属性，
   *     路径写刚才的html所在的文件夹路径。
   */
  // el: div,
  el: '#root',
  /**
   *webpack.config.practice.js 中要配置 alias 时，
   *才能使用template模板，不然Vue会报一个warnning ,
   *因为一般情况下，Vue引的包是 runtime-only 的包
   */
  template: '<div>this is content </div>'
})
