import intercept from './intercept';

/**
 * Options to register loadable methods.
 * @typedef {Object} LoadableOptions
 * @property {string} state
 */

/**
 * Decorates a function and register its loading state.
 * @template A, R
 * @param {(string | LoadableOptions)} options
 * @param {(...args: infer A) => (Promise<infer R> | infer R)} λ
 * @returns {(...args: A) => Promise<R>}
 */
const loadable = (options, λ) => {
  const state = typeof options === 'string' ? options : options.state;

  return function () {
    this.$_SET_LOADING(state);

    /**
     * Decrements a loading state.
     */
    const onDone = () => this.$_UNSET_LOADING(state);

    return intercept(() => λ.apply(this, arguments), onDone, onDone);
  };
};

export default loadable;
