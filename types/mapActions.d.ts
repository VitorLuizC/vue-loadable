declare type VuexModule = typeof import('vuex').default;
declare var Vuex: VuexModule;
export declare type MapActions = typeof Vuex.mapActions;
declare let mapActions: MapActions | undefined;
export default mapActions;
