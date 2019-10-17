import { VueConstructor } from 'vue';
import LoadableMixin from './LoadableMixin';
declare module 'vue/types/vue' {
    interface Vue {
        /**
         * Check if a state is loading.
         * @param [state] - Loading state name.
         */
        $isLoading(state?: string): boolean;
        /**
         * Check if any state is loading.
         */
        $isLoadingAny(): boolean;
        /**
         * Set state as loading.
         * @param [state] - Loading state name.
         */
        $setLoading(state?: string): void;
        /**
         * Unset state as loading.
         * @param [state] - Loading state name.
         */
        $unsetLoading(state?: string): void;
    }
}
export { LoadableMixin };
export { default as loadable, Method, LoadableMethod } from './loadable';
export { default as mapLoadableMethods, Methods, LoadableMethods } from './mapLoadableMethods';
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
