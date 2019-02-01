import { VueConstructor } from 'vue';
import callWithHooks from './callWithHooks';
import Loadable from './Loadable';

declare module 'vue/types/vue' {
  interface Vue {
    $isLoading(state?: string): boolean;
    $isLoadingAny(): boolean;
  }
}

export default {
  install (Vue: VueConstructor) {
    Vue.mixin(Loadable);
  }
};

export function loadable <Return, Params extends []> (
  this: any,
  λ: (...params: Params) => Return | Promise<Return>,
  state: string = 'generic',
): (this: any, ...args: Params) => Promise<Return> {
  return function (this: any) {
    const params = arguments as unknown as Params;

    this.$_SET_LOADING(state);

    return callWithHooks(
      () => λ.apply(this, params),
      () => this.$_UNSET_LOADING(state),
    );
  }
}
