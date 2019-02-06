import Vue from 'vue';
import test from 'ava';
import Loadable, { install, LoadableMixin, loadable } from '../src/vue-loadable';

// ..:: API tests ::..

test('API: it default exports an object with install function', (context) => {
  context.truthy(Loadable);
  context.is(typeof Loadable, 'object');
  context.is(typeof Loadable.install, 'function');
});

test('API: it named export install function, same as Loadable one', (context) => {
  context.is(typeof install, 'function');
  context.is(install, Loadable.install);
});

test('API: it named export LoadableMixin', (context) => {
  context.truthy(LoadableMixin);

  const methods = (LoadableMixin as any).options.methods;

  context.is(typeof methods.$isLoading, 'function');
  context.is(typeof methods.$isLoadingAny, 'function');
  context.is(typeof methods.$setLoading, 'function');
  context.is(typeof methods.$unsetLoading, 'function');

  const state = (LoadableMixin as any).options.data();

  context.truthy(state.LOADING_STATES);
  context.is(typeof state.LOADING_STATES, 'object');
});

test('API: it named export loadable decorator', (context) => {
  context.is(typeof loadable, 'function');
});

// ..:: Installation tests ::..

test('Install: Vue components can extend LoadableMixin', (context) => {
  const SignInForm = Vue.component('SignInForm', {
    mixins: [ LoadableMixin ]
  });

  const methods = (SignInForm as any).options.methods;

  context.is(typeof methods.$isLoading, 'function');
  context.is(typeof methods.$isLoadingAny, 'function');
  context.is(typeof methods.$setLoading, 'function');
  context.is(typeof methods.$unsetLoading, 'function');

  const state = (SignInForm as any).options.data();

  context.truthy(state.LOADING_STATES);
  context.is(typeof state.LOADING_STATES, 'object');
});

test('Install: Loadable usage on Vue install globally (on every components)', (context) => {
  Vue.use(Loadable);

  const SignUpForm = Vue.component('SignUpForm', {});

  const methods = (SignUpForm as any).options.methods;

  context.is(typeof methods.$isLoading, 'function');
  context.is(typeof methods.$isLoadingAny, 'function');
  context.is(typeof methods.$setLoading, 'function');
  context.is(typeof methods.$unsetLoading, 'function');

  const state = (SignUpForm as any).options.data();

  context.truthy(state.LOADING_STATES);
  context.is(typeof state.LOADING_STATES, 'object');
});
