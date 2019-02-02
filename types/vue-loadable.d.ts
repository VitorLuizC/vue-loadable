import Vue, { VueConstructor } from 'vue';
import { LoadableInstance } from './Loadable';
declare module 'vue/types/vue' {
    interface Vue {
        $isLoading(state?: string): boolean;
        $isLoadingAny(): boolean;
    }
}
declare const _default: {
    install(Vue: VueConstructor<Vue>): void;
};
export default _default;
export declare function loadable<Return, Params extends any[]>(λ: (this: LoadableInstance, ...params: Params) => Return | Promise<Return>, state?: string): (this: LoadableInstance, ...params: Params) => Promise<Return>;
