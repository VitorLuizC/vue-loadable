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

    y: loadable(function () {
      return sleep(4 * 1000)
        .then(() => this.z())
    }, 'y'),

    z: loadable(() => sleep(3 * 1000), 'z')
  },
  mounted () {
    this.x()
  }
}
</script>
