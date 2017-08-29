/* eslint-env commonjs */

const feature = {
  foo: 'bar',
  async load() {
    const featureImpl = (await System.import('./featureImpl')).default
    return {...feature, ...featureImpl}
  }
}

export default feature

