const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
/**
 * memory-fs 与 node的fs 两者api一模一样，但 memory-fs还拓展了fs的api
 * 区别在于，memory-fs不把文件写入到磁盘上，而fs会
 */
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    /**
     * 以下这个文件名可以用 webpack.config.server.js 中的plugins
     * 的 new VueServerPlugin 配置 { filename: 'what name you want' }
     */
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会儿，别着急......'
    return
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data
  console.log(clientManifest, 'miss you ~!')

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
