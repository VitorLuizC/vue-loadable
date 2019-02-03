import Vue from 'vue';
export declare type LoadableMixinInstance = Vue & LoadableMixinState & LoadableMixinMethods;
export declare type LoadableMixinState = {
    LOADING_STATES: Record<string, number>;
};
export declare type LoadableMixinMethods = {
    $isLoading(this: LoadableMixinInstance, state?: string): boolean;
    $isLoadingAny(this: LoadableMixinInstance): boolean;
    $_SET_LOADING(this: LoadableMixinInstance, state: string): void;
    $_UNSET_LOADING(this: LoadableMixinInstance, state: string): void;
};
declare const LoadableMixin: import("vue").VueConstructor<LoadableMixinState & LoadableMixinMethods & Record<never, any> & Vue>;
export default LoadableMixin;
