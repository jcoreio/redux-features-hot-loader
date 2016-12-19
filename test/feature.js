// @flow

/* eslint-env commonjs */

const feature = {
  foo: 'bar',
  load(): Promise<Object> {
    return new Promise(resolve => require.ensure(['./featureImpl'], require => resolve({
      ...feature,
      ...require('./featureImpl').default,
    })))
  }
}

export default feature

