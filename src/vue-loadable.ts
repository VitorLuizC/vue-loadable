import Vue, { VueConstructor } from 'vue';
import callWithHooks from './callWithHooks';
import Loadable, { LoadableInstance } from './Loadable';

declare module 'vue/types/vue' {
  interface Vue extends Pick<LoadableInstance, '$isLoading' | '$isLoadingAny'> {}
}

export default {
  install (Vue: VueConstructor) {
    Vue.mixin(Loadable);
  }
};

export function loadable <Return, Params extends any[], Instance extends Vue> (
  this: LoadableInstance<Instance>,
  λ: (...params: Params) => Return | Promise<Return>,
  state: string = 'generic',
): (this: LoadableInstance<Instance>, ...params: Params) => Promise<Return> {
  return function (this: LoadableInstance<Instance>) {
    const params = arguments as unknown as Params;

    this.$_SET_LOADING(state);

    return callWithHooks(
      () => λ.apply(this, params),
      () => this.$_UNSET_LOADING(state),
    );
  }
}
