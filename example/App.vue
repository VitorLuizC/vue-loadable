<template>
  <div class="LoadableExample">
    <p>X {{ $isLoading('x') }}</p>
    <hr>
    <p>Y {{ $isLoading('y') }}</p>
    <hr>
    <p>Z {{ $isLoading('z') }}</p>
    <hr>
    <p>Any {{ $isLoadingAny() }}</p>
  </div>
</template>

<script>
import { loadable } from '../src/vue-loadable'

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export default {
  methods: {
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
