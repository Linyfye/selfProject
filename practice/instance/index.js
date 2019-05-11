import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  data: {
    text: 0,
    obj: {}
  },
  template: '<div>{{text}} {{obj.a}}</div>'
})
app.$mount('#root')

let i = 0
setInterval(() => {
  i++
  // app.text += 1
  // app.$options.data.text += 1 //数据不会变
  // app.$data.text += 1  //数据会变

  // app.obj.a = i
  /**
   * 用这个方法的话，vue会将这个值转化为 reactive 的
   */
  app.$set(app.obj, 'a', i)
  // app.$forceUpdate()
}, 1000)

/**
 * vue 实例上的属性
 */
console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
/**
 * options是为创建这个vue实例时，传进去的那一整个对象
 */
console.log(app.$options)
/**
 * 用这个方法给 options 赋值是有作用的，
 * 但是需要在下一次有值的变化、重新渲染时，才会生效
 */
app.$options.render = (h) => {
  return h('div', {}, 'new render function')
}
/**
 * app.$root 是一个vue对象
 */
console.log(app.$root === app)
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$refs)
/**
 * 一般不会用到，只会在服务端渲染时才会有使用
 */
console.log(app.$isServer)

/**
 * 使用 app.$watch 与 写在实例上的 watch 属性的作用是一样的
 * 但是这样写的话，需要手动删掉这些监听
 */
app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})

/**
 * app.$on 和 app.$emit 只能作用于同一个vue对象
 * 事件不会向上冒泡
 * $once只触发一次事件
 */
app.$on('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
// app.$once('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

app.$emit('test', 1, 2)

/**
 * 强制整个组件进行重新刷新。
 */
app.$forceUpdate()

/**
 * 每次dom结点更新后，去做某个事情，
 * 就使用这个方法，传入一个回调函数
 */
// app.$nextTick([callBack Function])
