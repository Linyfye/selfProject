<template>
  <div id="app">
    <div id="cover"></div>
    <!-- <p>{{counter}}</p>
    <p>{{fullName}}</p> -->
    <Header></Header>
    <router-link to="/app"> app </router-link>
    <router-link to="/login"> login </router-link>
    <router-view />
    <!-- <todo></todo> -->
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  data () {
    return {
      text: 'abcd'
    }
  },
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    // console.log(this.$store)

    // let i = 1
    // setInterval(() => {
    //   this.updateCount(i++)
    // }, 1000)

    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)

    /**
     * 引用mapActions之后，直接使用方法名，传入参数即可
     */
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      // counter: 'count'
      counter: (state) => state.count
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
