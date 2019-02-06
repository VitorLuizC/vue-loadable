<template>
  <div id="app">
    <p>W {{ $isLoading('w') }}</p>
    <hr>
    <p>X {{ $isLoading('x') }}</p>
    <hr>
    <p>Y {{ $isLoading('y') }}</p>
    <hr>
    <p>Z {{ $isLoading('z') }}</p>
    <hr>
    <p>Any {{ $isLoadingAny() }}</p>
    <hr>
    <button @click="w()">Call W action</button>
  </div>
</template>

<script>
import { loadable, mapLoadableActions } from '../src/vue-loadable'

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export default {
  name: 'App',
  methods: {
    ...mapLoadableActions(['w']),

    x: loadable(async function () {
      await sleep(3 * 1000)
      this.y()
    }, 'x'),

    async y () {
      this.$setLoading('y')
      await sleep(4 * 1000)
      this.$unsetLoading('y')
      this.z()
    },

    z: loadable(() => sleep(3 * 1000), 'z')
  },
  mounted () {
    this.x()
  }
}
</script>
