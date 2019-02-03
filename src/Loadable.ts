import Vue from 'vue';

export type LoadableInstance = Vue & LoadableState & LoadableMethods;

export type LoadableState = {
  LOADING_STATES: Record<string, number>;
};

export type LoadableMethods = {
  $isLoading (this: LoadableInstance, state?: string): boolean;
  $isLoadingAny (this: LoadableInstance): boolean;
  $_SET_LOADING (this: LoadableInstance, state: string): void;
  $_UNSET_LOADING (this: LoadableInstance, state: string): void;
};

const Loadable = Vue.extend({
  data (): LoadableState {
    return {
      LOADING_STATES: Object.create(null)
    };
  },
  methods: {
    $isLoading (state = 'generic') {
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
  } as LoadableMethods
});

export default Loadable;
