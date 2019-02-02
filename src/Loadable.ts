import Vue from 'vue';

export type LoadableInstance <V extends Vue = Vue> = V & LoadableState & LoadableMethods;

export type LoadableState = {
  $_LOADING_STATES: Record<string, number>;
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
      $_LOADING_STATES: Object.create(null)
    };
  },
  methods: {
    $isLoading (state = 'generic') {
      const value = this.$_LOADING_STATES[state];
      return !!value && value > 0;
    },

    $isLoadingAny () {
      return Object.keys(this.$_LOADING_STATES).some(this.$isLoading);
    },

    $_SET_LOADING (state) {
      const value = this.$_LOADING_STATES[state];
      this.$set(this.$_LOADING_STATES, state, value ? value + 1 : 1);
    },

    $_UNSET_LOADING (state) {
      const value = this.$_LOADING_STATES[state];
      this.$set(this.$_LOADING_STATES, state, value ? value - 1 : 0);
    }
  } as LoadableMethods
});

export default Loadable;
