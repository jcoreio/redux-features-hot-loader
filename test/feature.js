/* eslint-env commonjs */

const feature = {
  foo: 'bar',
  load() {
    return new Promise(resolve => require.ensure(['./featureImpl'], require => resolve({
      ...feature,
      ...require('./featureImpl').default,
    })))
  }
}

export default feature

