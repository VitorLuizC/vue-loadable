declare type VuexModule = typeof import('vuex').default;
declare var Vuex: VuexModule;
/**
 * Vuex's mapActions type defintions.
 */
export declare type MapActions = typeof Vuex.mapActions;
/**
 * Vuex's mapActions helper.
 */
declare let mapActions: MapActions | undefined;
export default mapActions;
