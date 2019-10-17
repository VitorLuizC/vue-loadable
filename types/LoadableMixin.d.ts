import Vue from 'vue';
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
declare const LoadableMixin: import("vue").VueConstructor<{
    LOADING_STATES: Record<string, number>;
} & {
    $isLoading(state?: string): boolean;
    $isLoadingAny(): boolean;
    $setLoading(state?: string): void;
    $unsetLoading(state?: string): void;
} & Record<never, any> & Vue>;
export default LoadableMixin;
