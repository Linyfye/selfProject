import creatApp from './create-app'

const { app, router } = creatApp()

router.onReady(() => {
  app.$mount('#root')
})
