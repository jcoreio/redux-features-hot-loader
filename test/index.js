import fs from 'fs'
import path from 'path'
import map from 'lodash.map'
import promisify from 'es6-promisify'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import config from './webpack.config'
import {expect} from 'chai'
import {EventEmitter} from 'events'
import {loadFeature} from 'redux-features'

/* eslint-env node */
/* global browser store */

const {port} = config.devServer

describe('redux-features-hot-loader', () => {
  let server

  const events = new EventEmitter()

  function compiled() {
    return new Promise(resolve => {
      function listener() {
        events.removeListener('done', listener)
        resolve()
      }
      events.on('done', listener)
    })
  }

  const origFiles = {}

  async function sed(file, regexp, replacement) {
    const code = await promisify(fs.readFile)(file, 'utf8')
    if (origFiles[file] == null) origFiles[file] = code
    await promisify(fs.writeFile)(file, code.replace(regexp, replacement), 'utf8')
  }

  before(async function () {
    this.timeout(10000)

    const compiler = webpack({
      ...config,
      plugins: [
        ...config.plugins,
        {apply: compiler => compiler.plugin('done', () => events.emit('done'))},
      ]
    })
    server = new webpackDevServer(compiler, config.devServer)
    server.listen(config.devServer.port)
    await compiled()
  })
  after(async function () {
    this.timeout(10000)
    server.close()
    await Promise.all(map(origFiles, (code, file) => promisify(fs.writeFile)(file, code, 'utf8')))
  })
  it('works', async function () {
    this.timeout(10000)
    await browser.url(`http://localhost:${port}`)
    let f1 = (await browser.execute(() => store.getState().features.f1)).value
    expect(f1.foo).to.equal('bar')

    await browser.execute(action => store.dispatch(action), loadFeature('f1'))
    f1 = (await browser.execute(() => store.getState().features.f1)).value
    expect(f1.hello).to.equal('world')

    await sed(path.join(__dirname, 'feature.js'), /foo: 'bar'/, "foo: 'baz'")
    await compiled()
    await new Promise(resolve => setTimeout(resolve, 500))
    f1 = (await browser.execute(() => store.getState().features.f1)).value
    expect(f1.foo).to.equal('baz')
    expect(f1.hello).to.equal('world')

    await sed(path.join(__dirname, 'featureImpl.js'), /hello: 'world'/, "hello: 'hot reloading'")
    await compiled()
    await new Promise(resolve => setTimeout(resolve, 500))
    f1 = (await browser.execute(() => store.getState().features.f1)).value
    expect(f1.foo).to.equal('baz')
    expect(f1.hello).to.equal('hot reloading')
  })
})

