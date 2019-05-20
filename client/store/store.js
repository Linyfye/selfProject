import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]
    /**
     * 添加模块
     * 1、在vue组件直接使用模块内的state的语法是：this.$store.state.a.text
     *    使用 ...mapState()解构的语法是：...mapState({ textA: state => state.a.text })
     * 2、mutations
     *    加了namespaced 的模块，引用mutations的语法是：...mapMutations(['a/updateText])
     *        调用方法时使用：this['a/updateText]('123') // 括号内部是参数。
     * 3、getters
     *    加了namespaced 的模块，引用mutations的语法是：
     *      ...mapMutations(['a/textPlus']) ->  调用方法时使用：this['a/textPlus]  // 这种方式不适合在template里面使用
     *      或者 ...mapMutations({ textPlus: 'a/textPlus' }) -> 直接使用this.textPlus
     * 4、actions
     *    commit的方法默认会在本模块中寻找，如果要配置全局寻找的功能，则要加 { root: ture }
     *       在组件调用时，语法为： ...mapActions(['a/add]) -> this['a/add']()  // 也是要加模块名的
     *    如果commit的是别的模块的方法，需要把模块名加上，具体查看下面 b模块的使用。
     *    如果模块没有声明namespaced,则像全局 action 一样调用
     */
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    /**
     * 参数说明：state——本模块的state
     *          getters——所有的getter 方法
     *          rootState——全局的state
     */
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       }
    //     },
    //     actions: {
    /**
     * 参数说明：state——本模块的state
     *          commit——所有的commit方法
     *          rootState——全局的state
     */
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', { num: 56789 }, { root: true })
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true,
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })
  /**
   * 配置vuex的热更新功能
   */
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        actions: newActions,
        mutations: newMutations,
        getters: newGetters
      })
    })
  }
  return store
}

/**
 * 动态注册一个模块的功能,需要在生成store之后，调用 registerModule 这个方法
 */
// store.registerModule('c' , {
//   state: {
//     text: 3
//   }
// })
