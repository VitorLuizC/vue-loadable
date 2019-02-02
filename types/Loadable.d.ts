import Vue from 'vue';
export declare type LoadableInstance = Vue & LoadableState & LoadableMethods;
export declare type LoadableState = {
    $_LOADING_STATES: Record<string, number>;
};
export declare type LoadableMethods = {
    $isLoading(this: LoadableInstance, state?: string): boolean;
    $isLoadingAny(this: LoadableInstance): boolean;
    $_SET_LOADING(this: LoadableInstance, state: string): void;
    $_UNSET_LOADING(this: LoadableInstance, state: string): void;
};
declare const Loadable: import("vue").VueConstructor<LoadableState & LoadableMethods & Record<never, any> & Vue>;
export default Loadable;
