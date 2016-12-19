/* eslint-env commonjs */

var loaderUtils = require("loader-utils")

// istanbul ignore next
module.exports = function () {}
module.exports.pitch = function (remainingRequest) {
  this.cacheable && this.cacheable()
  var moduleRequest = loaderUtils.stringifyRequest(this, "!!" + remainingRequest)

  return [
    "var features = require('redux-features')",
    'var feature = module.exports = require(' + moduleRequest + ').default',
    'var loaded = false',
    'if (module.hot) {',
    '  var _init = feature.init',
    '  var _load = feature.load',
    '  function init(store, id) {',
    '    if (_init) _init(store, id)',
    '	   module.hot.accept(' + moduleRequest + ', function hotReload() {',
    '      feature = require(' + moduleRequest + ').default',
    '      _init = feature.init',
    '      _load = feature.load',
    '      feature.init = init',
    '      if (_load) feature.load = load',
    '      store.dispatch(features.replaceFeature(id, feature))',
    '      if (loaded) store.dispatch(features.loadFeature(id))',
    '    })',
    '  }',
    '  function load(store) {',
    '    loaded = true',
    '    return _load(store)',
    '  }',
    '  feature.init = init',
    '  if (_load) feature.load = load',
    '}',
  ].join("\n")
}

