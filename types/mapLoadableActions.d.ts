import { MapActions } from './mapActions';
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
declare const mapLoadableActions: MapActions;
export default mapLoadableActions;
