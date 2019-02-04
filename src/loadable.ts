import callWithHooks from './callWithHooks';
import { LoadableMixinInstance } from './LoadableMixin';

/**
 * Decorate a function to causes loading states changes during its execution. It
 * set state as loading when function is init and unset on throws an error or
 * resolve/return.
 * @example ```js
 * Vue.component('SignInForm', {
 *   methods: {
 *     signIn: loadable(async function ({ email, password }) {
 *       // ...
 *     }, 'signIn')
 *   }
 * })```
 * @param λ - A function, commonly async, which causes loading state changes.
 * @param [state] - Loading state name.
 */
export default function loadable <Return, Params extends any[]> (
  λ: (this: LoadableMixinInstance, ...params: Params) => Return | Promise<Return>,
  state: string = 'unknown',
): (this: LoadableMixinInstance, ...params: Params) => Promise<Return> {
  return function () {
    const params = arguments as unknown as Params;

    this.$setLoading(state);

    return callWithHooks(
      () => λ.apply(this, params),
      () => this.$unsetLoading(state)
    );
  };
}
