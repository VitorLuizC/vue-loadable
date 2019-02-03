import { VueConstructor } from 'vue';
import LoadableMixin from './LoadableMixin';
declare module 'vue/types/vue' {
    interface Vue {
        $isLoading(state?: string): boolean;
        $isLoadingAny(): boolean;
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
export declare function install(Vue: VueConstructor): void;
declare const _default: {
    install: typeof install;
};
export default _default;
