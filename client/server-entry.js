import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    console.log('===============================================')
    console.log(router)
    console.log(app)
    console.log(context)
    console.log('===============================================')
    router.push(context.url)

    /**
     * router.onReady 一般只有服务端渲染时，才会被触发
     */
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
