import { VueConstructor } from 'vue';
import callWithHooks from './callWithHooks';
import LoadableMixin, { LoadableMixinInstance } from './LoadableMixin';

declare module 'vue/types/vue' {
  interface Vue {
    $isLoading (state?: string): boolean;
    $isLoadingAny (): boolean;
  }
}

export { LoadableMixin };

export default {
  install (Vue: VueConstructor) {
    Vue.mixin(LoadableMixin);
  }
};

export function loadable <Return, Params extends any[]> (
  λ: (this: LoadableMixinInstance, ...params: Params) => Return | Promise<Return>,
  state: string = 'generic',
): (this: LoadableMixinInstance, ...params: Params) => Promise<Return> {
  return function () {
    const params = arguments as unknown as Params;

    this.$_SET_LOADING(state);

    return callWithHooks(
      () => λ.apply(this, params),
      () => this.$_UNSET_LOADING(state),
    );
  };
}
