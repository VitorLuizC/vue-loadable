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
const LoadableMixin = Vue.extend({
  data() {
    return {
      LOADING_STATES: Object.create(null) as Record<string, number>,
    };
  },
  methods: {
    $isLoading(state = 'unknown') {
      const value = this.LOADING_STATES[state];
      return !!value && value > 0;
    },

    $isLoadingAny() {
      return Object.keys(this.LOADING_STATES).some(this.$isLoading);
    },

    $setLoading(state = 'unknown') {
      const value = this.LOADING_STATES[state];
      this.$set(this.LOADING_STATES, state, value ? value + 1 : 1);
    },

    $unsetLoading(state = 'unknown') {
      const value = this.LOADING_STATES[state];
      this.$set(this.LOADING_STATES, state, value ? value - 1 : 0);
    },
  },
});

export default LoadableMixin;
