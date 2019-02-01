import Vue from 'vue';
declare const Loadable: import("vue").VueConstructor<{
    $_LOADING_STATES: Record<string, number>;
} & {
    $isLoading(state?: string): boolean;
    $isLoadingAny(): boolean;
    $_SET_LOADING(state: string): void;
    $_UNSET_LOADING(state: string): void;
} & Record<never, any> & Vue>;
export default Loadable;
