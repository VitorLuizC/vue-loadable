import Vue from 'vue'
import App from './App.vue'
import Loadable from '../src/vue-loadable'

Vue.use(Loadable)

new Vue({
  el: '#app',
  render: (λ) => λ(App)
})
