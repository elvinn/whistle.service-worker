const Koa = require('koa')
const queryString = require('query-string')

const { readFileSync } = require('fs')
const path = require('path')

const workboxFile = readFileSync(path.join(__dirname, '../public/workbox-sw.dev.js'), 'utf8')
const swFile = readFileSync(path.join(__dirname, '../public/sw.js'), 'utf8')

module.exports = (server, options) => {
  const app = new Koa()

  // For html files, append register.html to them to register service worker.
  // For others, set sw.js content.
  app.use(async ctx => {
    const headers = ctx.req.headers
    if (/text\/html/.test(headers.accept)) {
      ctx.body = JSON.stringify({
        rules: `${headers.host} html://public/register.html`
      })
    } else {
      const rules = queryString.parse(decodeURIComponent(headers['x-whistle-rule-value'])) || {}
      const swContent = swFile.replace(/ROUTE_PLACEHOLDER/g, rules.route || '/.*/')
        .replace(/STRATEGY_PLACEHOLDER/g, rules.strategy || 'cacheFirst')
      ctx.body = JSON.stringify({
        rules: `${headers.host}/sw.js file://{swContent}`,
        values: {
          'swContent': workboxFile + '\r\n\r\n' + swContent
        }
      })
    }
  })

  server.on('request', app.callback())
}
