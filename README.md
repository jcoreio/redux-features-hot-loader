# redux-features-hot-loader

[![Build Status](https://travis-ci.org/jcoreio/redux-features-hot-loader.svg?branch=master)](https://travis-ci.org/jcoreio/redux-features-hot-loader)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/redux-features-hot-loader/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/redux-features-hot-loader?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Webpack hot reloading for [redux-features](https://github.com/jcoreio/redux-features)

## Usage
```
npm install --save-dev redux-features-hot-loader
```

### Inline
```js
import {addFeature} from 'redux-features'
import store from './store'
import myFeature from 'redux-features-hot-loader!./myFeature'

store.dispatch(addFeature('myFeature', myFeature))
```

### Webpack loader (Webpack 1)
**This should come before your main `\.js$` loader.**

For instance to apply this to all files ending in `Feature.js`:
```js
{
  test: /Feature\.js$/,
  loader: 'redux-features-hot-loader',
},
```

