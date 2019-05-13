import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    /**
     * 配置这个参数,则经过vue-router进行路由跳转时,都会默认加上
     */
    // base: '/base/',
    /**
     * 这两个配置项可以使路由跳转的a标签自定义类名,以达到自定义样式的目的.
     */
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'

    /**
     * 在页面进行跳转的时候,页面需不需要滚动的配置
     * 参数说明: to-目标路由,为router对象;from-源路由,为router对象;
     *          savedPosition-如果目标路由之前有到过,则为true,如果目标路由从未被跳转到过,则为false.
     */
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },
    /**
     * url问号后的参数为query,这个配置项可以自定义"字符串转成 jsonObject 的方法"
     * 参数为 字符串-String
     */
    // parseQuery (query) {
    // },
    /**
     * 这个配置项可以自定义"jsonObject 转成 字符串的方法"
     * 参数为 对象-Object
     */
    // stringifyQuery (obj) {
    // },
    /**
     * 不是所有浏览器都支持 history 形式的前端路由跳转
     * 这个配置项使得 在不支持这种形式的跳转时,vue-router会自动fallback成hash的这种模式 ----设置为true的情况下
     * 如果觉得不需要,则可以设置为 false
     */
    // fallback: true
  })
}
