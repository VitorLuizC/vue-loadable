import { VueConstructor } from 'vue';
declare module 'vue/types/vue' {
    interface Vue {
        $isLoading(state?: string): boolean;
        $isLoadingAny(): boolean;
    }
}
declare const _default: {
    install(Vue: VueConstructor<import("vue").default>): void;
};
export default _default;
export declare function loadable<Return, Params extends []>(this: any, λ: (...params: Params) => Return | Promise<Return>, state?: string): (this: any, ...args: Params) => Promise<Return>;
