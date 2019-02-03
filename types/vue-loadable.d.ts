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
declare const _default: {
    install(Vue: VueConstructor<import("vue").default>): void;
};
export default _default;
