const server = require('express')(),
      path = require('path'),
      MFS = require('memory-fs'),
      webpack = require('webpack'),
      devMiddleware = require('webpack-dev-middleware'),
      hotMiddleware = require('webpack-hot-middleware'),
      clientConfig = require('./webpack.client.dev.js'),
      clientCompiler = webpack(clientConfig),
      webpackDevMiddleware = devMiddleware(clientCompiler, {
        noInfo: false,
        publicPath: clientConfig.output.publicPath,
        stats: {colors: true},
        headers: {'Access-Control-Allow-Origin': '*'}
      }),
      webpackHotMiddleware = hotMiddleware(clientCompiler, {heartbeat: 500}),
      indexPath = path.resolve(__dirname, '../dist/client/index.html'),
      compilerFS = new MFS(),
      fileRegExp = /\.(?:\w)+\??/


clientCompiler.outputFileSystem = compilerFS

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)

// Custom serve-static =/
server.get(fileRegExp, (req, res) => {
  webpackDevMiddleware.waitUntilValid(() => {
    const filePath = path.resolve(__dirname, '../dist/client', req.url.slice(1))
    let file = null

    res.type(path.parse(req.url).base)

    try {
      file = compilerFS.readFileSync(filePath) // eslint-disable-line
    }
    catch (e) {
      return res.status(404).end()
    }

    res.end(file)
  })
})

server.get('*', (req, res) => {
  webpackDevMiddleware.waitUntilValid(() => {
    let file

    try {
      file = compilerFS.readFileSync(indexPath) // eslint-disable-line
    }
    catch (e) {
      return res.status(404).end()
    }

    res.type('html')
    res.send(file)
  })
})

server.listen(1488, () => {
  console.log('Please, wait for the build process to finish.')
})
  .on('connection', sock => sock.setNoDelay(true))
