import loadable, { Method, LoadableMethod } from './loadable';

/**
 * Type of an object whose keys are `string` and the values are methods.
 */
export type Methods = Record<string, Method>;

/**
 * A Higher-order type to transform methods into loadable methods. It keeps keys
 * as-is, but values have access to `this` (Vue instance) and returns a Promise.
 */
export type LoadableMethods<T extends Methods> = {
  [K in keyof T]: LoadableMethod<T[K]>;
};

/**
 * Maps an object, whose keys are `string` and the values are methods, to
 * loadable methods that triggers loading states. It uses property's keys as
 * loading state names.
 * @example
 * Vue.component('SignInForm', {
 *   ...,
 *   methods: {
 *     onClick() {
 *       if (this.$isLoading('signIn') || this.$isLoading('signUp'))
 *         return;
 *       // ...
 *     },
 *     ...mapLoadableMethods(
 *       mapActions('authentication', [
 *         'signIn',
 *         'signUp'
 *       ])
 *     )
 *   }
 * });
 */
const mapLoadableMethods = <T extends Methods>(
  methods: T,
): LoadableMethods<T> => {
  const names = Object.keys(methods) as (string & keyof T)[];

  return names.reduce(
    (loadableMethods, name) => {
      loadableMethods[name] = loadable(methods[name], name);
      return loadableMethods;
    },
    Object.create(null) as LoadableMethods<T>,
  );
};

export default mapLoadableMethods;
