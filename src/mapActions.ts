type VuexModule = typeof import('vuex').default;

declare var Vuex: VuexModule;

export type MapActions = typeof Vuex.mapActions;

let mapActions: MapActions | undefined;

if (typeof Vuex !== 'undefined' && 'mapActions' in Vuex) {
  mapActions = Vuex.mapActions;
} else {
  try {
    mapActions = (require('vuex') as VuexModule).mapActions;
  } catch {}
}

export default mapActions;
