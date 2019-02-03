import loadable from './loadable';
import mapActions, { MapActions } from './mapActions';

/**
 * Map Vuex actions into Vue component's methods and trigger loading states. It
 * uses method's names as loading state name.
 * @example ```js
 * Vue.component('SignInForm', {
 *   ...,
 *   methods: mapLoadableActions('authentication', [
 *     'signIn',
 *     'signUp'
 *   ])
 * })
 */
const mapLoadableActions: MapActions = function () {
  if (mapActions === undefined)
    throw new Error('Can\'t use "mapLoadableActions" without Vuex.');

  const params = arguments as unknown as Parameters<MapActions>;
  const actions = mapActions.apply(null, params);
  const methods = Object.create(null) as ReturnType<MapActions>;

  Object.keys(actions).forEach((name) => {
    methods[name] = loadable(actions[name], name);
  });

  return methods;
};

export default mapLoadableActions;
