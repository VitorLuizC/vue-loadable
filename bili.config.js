/**
 * Bili's configuration object.
 * @type {import('bili').Config}
 */
const configuration = {
  banner: true,
  input: 'src/vue-loadable.js',
  output: {
    format: ['es', 'cjs', 'umd', 'umd-min'],
    moduleName: 'VueLoadable'
  }
}

module.exports = configuration
