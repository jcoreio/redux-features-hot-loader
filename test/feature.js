/* eslint-env commonjs */

const feature = {
  foo: 'bar',
  async load() {
    const featureImpl = (await import('./featureImpl')).default
    return {...feature, ...featureImpl}
  }
}

export default feature

