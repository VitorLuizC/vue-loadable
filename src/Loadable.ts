import Vue from 'vue';

const Loadable = Vue.extend({
  data () {
    return {
      $_LOADING_STATES: Object.create(null) as Record<string, number>
    };
  },
  methods: {
    $isLoading (state: string = 'generic'): boolean {
      const value = this.$_LOADING_STATES[state];
      return !!value && value > 0;
    },

    $isLoadingAny (): boolean {
      return Object.keys(this.$_LOADING_STATES).some(this.$isLoading);
    },

    $_SET_LOADING (state: string): void {
      const value = this.$_LOADING_STATES[state];
      this.$set(this.$_LOADING_STATES, state, value ? value + 1 : 1);
    },

    $_UNSET_LOADING (state: string): void {
      const value = this.$_LOADING_STATES[state];
      this.$set(this.$_LOADING_STATES, state, value ? value - 1 : 0);
    }
  }
});

export default Loadable;
