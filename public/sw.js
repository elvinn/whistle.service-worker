/* global WorkboxSW */
const workboxSW = new WorkboxSW({ clientsClaim: true })

// PLACEHOLDERs will be replaced by whistle rule value in lib/rulesServer.js
workboxSW.router.registerRoute(
  ROUTE_PLACEHOLDER, // eslint-disable-line
  workboxSW.strategies.STRATEGY_PLACEHOLDER()
)
