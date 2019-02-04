import Vue from 'vue';
export declare type LoadableMixinInstance = Vue & LoadableMixinState & LoadableMixinMethods;
export declare type LoadableMixinState = {
    LOADING_STATES: Record<string, number>;
};
export declare type LoadableMixinMethods = {
    /**
     * Check if a state is loading.
     * @param [state] - Loading state name.
     */
    $isLoading(this: LoadableMixinInstance, state?: string): boolean;
    /**
     * Check if any state is loading.
     */
    $isLoadingAny(this: LoadableMixinInstance): boolean;
    /**
     * Set state as loading.
     * @param [state] - Loading state name.
     */
    $setLoading(this: LoadableMixinInstance, state?: string): void;
    /**
     * Unset state as loading.
     * @param [state] - Loading state name.
     */
    $unsetLoading(this: LoadableMixinInstance, state?: string): void;
};
/**
 * A mixin which adds loading states and helpers to Vue components.
 * @example ```js
 * Vue.component('SignUpForm', {
 *   mixins: [ LoadableMixin ],
 *   ...,
 *   mounted () {
 *     if (this.$isLoadingAny())
 *       console.log('Loading...');
 *   }
 * })```
 */
declare const LoadableMixin: import("vue").VueConstructor<LoadableMixinState & LoadableMixinMethods & Record<never, any> & Vue>;
export default LoadableMixin;
