// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/todo/todo.vue'),
    /*
    * 元信息
    */
    meta: {
      title: 'this is app',
      description: '这条街最靓的仔'
    }
    /**
     * 子路由, 需要在父组件中使用 route-view 标签来标识子组件展示的位置
     */
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  /**
   * 当使用params这种形式来向组件传参时,
   * 可以设置 props 为 true , 此时, id 将作用父级属性传入 Todo 组件中,
   * Todo组件只需要在 props 中接住此属性即可,实现了一个路由与组件解耦的目的
   * 即: 在其他地方也能使用Todo组件 ---- 将 id 传入 Todo 便能使用了.
   */
  /**
   * props 的使用:
   *  1) 设置为 true ,则组件
   *  2) props: { id : '456' } // 定义成对象,覆盖掉组件跳转时传入Todo组件的值
   *  3) props: (route) => ({ id: route.query.b }) // 定义成一个函数,传入route对象,取其中 query的值赋给id
   */
  // {
  //   path: '/app/:id',
  //   props: true,
  //   component: Todo
  // },
  /**
   * 命名视图
   * 如果同一个页面要展示两个组件,则可以使用两个router-view来实现,用相应的名字来区别两个视图
   * 如: <router-view /> ---- 对应 default 的那个视图
   *    <router-view name="a" /> ---- 对应 a 的那个视图
   */
  // {
  //   path: '/app',
  //   name: 'app',
  //   components: {
  //     default: Todo,
  //     a: Login
  //   }
  // },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
  /**
   * 2、在路由配置时添加的路由钩子
   */
  // {
  //   path: '/app',
  //   component: Todo,
  //   beforeEnter (to, from, next) {
  //     console.log('app route before enter')
  //     // 在进入这个路由之前的处理业务
  //     // 也是需要执行 next()才会进行路由跳转
  //   }
  // }
]
/**
 * 1、导航守卫
 * 以下三者的执行顺序是: beforeEach 、beforeResolve 、afterEach
 */
// router.beforeEach((to , from , next) => {
//   console.log('before each invoked')
//   // 这里写业务处理----可以进行数据校验等
//   next() // 要触发这个回调函数,不然不会进行跳转
// })
// router.beforeResolve((to, from, next) => {
//   console.log('before resolve invoked')
//  // 用途跟beforeEach差不多
// })
// router.afterEach((to, from) => {
//   console.log('after each invoked')
//   // 路由跳转之后的处理
//   // 这里因为是跳转之后的,所以没有 next 回调函数了
// })

/**
 * 3、在组件内部进行的路由配置
 *  这种情况下，拿不到组件的 this对象，因为还没有触发 next()回调，组件对象根本还没有被创建
 *  想要取到数据并赋值给组件的话，可以在 next 添加一个回调函数，如下
 *  next( vm => { console.log('after enter vm.id is ', vm.id)})
 *  之所以可以这样做的原因是，next()执行之后，组件对象就被创建了，并作为参数返回到next执行之后的回调函数中。
 */
// beforeRouteEnter (to, from, next ) {
//   console.log('组件 before enter ')
//   next( vm => { console.log('after enter vm.id is ', vm.id)})
// }
// beforeRouteUpdate (to, from, next ) {
//   console.log('组件 update enter ')
// }
// beforeRouteLeave ( to, from, next ) {
//   console.log('组件 before leave ')
// }

/**
 * 三种路由导航钩子的执行顺序是
 *  (from)组件 before leave ---- 上个组件的beforeRouteLeave方法
 *  before each invoked ---- router.beforeEach 即整个route对象
 *  app route before enter ---- 路由配置项的beforeEnter方法
 *  (to)组件 before enter ---- 跳入的组件的beforeRouteEnter方法
 *  before resolve invoked ---- router.beforeResolve 即整个route对象
 *  after each invoked ---- router.afterEach 即整个route对象
 *
 * 而组件的beforeRouteUpdate是同一个组件在不同的路由下面显示时，才会触发
 * 如 详情页跳详情页时，只id参数不同，而渲染的组件实质为同一个，此时会触发 beforeRouteUpdate 方法
 * 此时，路由配置项的beforeEnter、组件的beforeRouteEnter方法都不会再触发。
 *  before each invoked ---- router.beforeEach 即整个route对象
 *  组件 update enter ---- 组件的beforeRouteUpdate 方法
 *  before resolve invoked ---- router.beforeResolve 即整个route对象
 *  after each invoked ---- router.afterEach 即整个route对象
 */

/**
 * 要使用异步加载组件的方式，则需要安装webpack插件 babel-plugin-syntax-dynamic-import
 * 并修改 .babelrc配置文件，在其的plugins配置中，添加 "syntax-dynamic-import"
 */
