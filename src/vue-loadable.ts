import { VueConstructor } from 'vue';
import LoadableMixin from './LoadableMixin';

declare module 'vue/types/vue' {
  interface Vue {
    $isLoading (state?: string): boolean;
    $isLoadingAny (): boolean;
  }
}

export { LoadableMixin };

export { default as loadable } from './loadable';

export { default as mapLoadableActions } from './mapLoadableActions';

export default {
  install (Vue: VueConstructor) {
    Vue.mixin(LoadableMixin);
  }
};
