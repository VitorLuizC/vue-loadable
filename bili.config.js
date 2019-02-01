/**
 * Bili's configuration object.
 * @type {import('bili').Config}
 */
module.exports = {
  banner: true,
  input: 'src/vue-loadable.ts',
  output: {
    format: ['es', 'cjs', 'umd', 'umd-min'],
    moduleName: 'VueLoadable'
  },
  plugins: {
    'typescript2': {
      clean: true,
      verbosity: 0,
      useTsconfigDeclarationDir: true,
    }
  }
};
