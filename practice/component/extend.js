import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const componet2 = {
  extends: compoent,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
}

// const CompVue = Vue.extend(compoent)

// new CompVue({
//   el: '#root',
/**
 * 用 props 时，CompVue 取不到 propOne 的值
 * 需要使用 propsData 才取让其取到
 */
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
/**
 * 使用extended时,如 compA extend compB 且 compB也有 mouted方法
 * 则 compB的mounted方法先执行，然后是 compA 的 mounted方法。
 */
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  mounted () {
    console.log(this.$parent.$options.name)
  },
  components: {
    Comp: componet2
  },
  data: {
    text: 23333
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
  `
})
