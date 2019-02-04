import { VueConstructor } from 'vue';
import LoadableMixin from './LoadableMixin';

declare module 'vue/types/vue' {
  interface Vue {
    $isLoading (state?: string): boolean;
    $isLoadingAny (): boolean;
    $setLoading (state?: string): void;
    $unsetLoading (state?: string): void;
  }
}

export { LoadableMixin };

export { default as loadable } from './loadable';

export { default as mapLoadableActions } from './mapLoadableActions';

/**
 * Installs LoadableMixin globally.
 * @example ```js
 * Vue.use(install)```
 * @param Vue - The Vue constructor.
 */
export function install (Vue: VueConstructor): void {
  Vue.mixin(LoadableMixin);
}

export default { install };
