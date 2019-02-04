import Vue from 'vue';

export type LoadableMixinInstance = Vue & LoadableMixinState & LoadableMixinMethods;

export type LoadableMixinState = {
  LOADING_STATES: Record<string, number>;
};

export type LoadableMixinMethods = {
  $isLoading (this: LoadableMixinInstance, state?: string): boolean;
  $isLoadingAny (this: LoadableMixinInstance): boolean;
  $_SET_LOADING (this: LoadableMixinInstance, state: string): void;
  $_UNSET_LOADING (this: LoadableMixinInstance, state: string): void;
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
const LoadableMixin = Vue.extend({
  data (): LoadableMixinState {
    return {
      LOADING_STATES: Object.create(null)
    };
  },
  methods: {
    $isLoading (state = 'unknown') {
      const value = this.LOADING_STATES[state];
      return !!value && value > 0;
    },

    $isLoadingAny () {
      return Object.keys(this.LOADING_STATES).some(this.$isLoading);
    },

    $_SET_LOADING (state) {
      const value = this.LOADING_STATES[state];
      this.$set(this.LOADING_STATES, state, value ? value + 1 : 1);
    },

    $_UNSET_LOADING (state) {
      const value = this.LOADING_STATES[state];
      this.$set(this.LOADING_STATES, state, value ? value - 1 : 0);
    }
  } as LoadableMixinMethods
});

export default LoadableMixin;
