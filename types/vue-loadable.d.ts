import Vue, { VueConstructor } from 'vue';
import { LoadableInstance } from './Loadable';
declare module 'vue/types/vue' {
    interface Vue extends Pick<LoadableInstance, '$isLoading' | '$isLoadingAny'> {
    }
}
declare const _default: {
    install(Vue: VueConstructor<Vue>): void;
};
export default _default;
export declare function loadable<Return, Params extends any[], Instance extends Vue>(this: LoadableInstance<Instance>, λ: (...params: Params) => Return | Promise<Return>, state?: string): (this: LoadableInstance<Instance>, ...params: Params) => Promise<Return>;
