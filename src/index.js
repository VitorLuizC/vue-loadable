/**
 * Load function.
 * @typedef {function():Promise.<*>} Load
 */

/**
 * Default load function.
 * @type {Load}
 */
const DEFAULT_LOAD = () => Promise.resolve(undefined)

/**
 * Add loading state based on load method or param.
 * @param {Load} [load]
 */
const Loadable = (load = DEFAULT_LOAD) => ({
  data () {
    return {
      isLoading: false
    }
  },

  mounted () {
    this.isLoading = true

    Promise.all([
      Promise.resolve(this.load),
      Promise.resolve(load)
    ])
      .then(() => {
        this.isLoading = false
      })
  }
})

export default Loadable
