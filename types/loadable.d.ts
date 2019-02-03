import { LoadableMixinInstance } from './LoadableMixin';
export default function loadable<Return, Params extends any[]>(λ: (this: LoadableMixinInstance, ...params: Params) => Return | Promise<Return>, state?: string): (this: LoadableMixinInstance, ...params: Params) => Promise<Return>;
