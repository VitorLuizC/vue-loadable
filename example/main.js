import Vue from 'vue'
import Vuex, { Store } from 'vuex';
import App from './App.vue'
import Loadable from '../src/vue-loadable'

Vue.use(Vuex)

Vue.use(Loadable)

const store = new Store({
  actions: {
    async w () {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }
})

new Vue({
  el: '#app',
  store,
  render: (λ) => λ(App)
})
