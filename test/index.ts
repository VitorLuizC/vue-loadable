import Vue from 'vue';
import test from 'ava';
import Loadable, { install, LoadableMixin, loadable } from '../src/vue-loadable';

// ..:: API Tests ::..

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

// ..:: Loadable method tests ::..

test('Loadable: $isLoading and $isLoadingAny returns false when no state is loading', (context) => {
  const SignInForm = new (
    LoadableMixin.extend({})
  );

  context.false(SignInForm.$isLoading('state'));
  context.false(SignInForm.$isLoading());
  context.false(SignInForm.$isLoadingAny());
});

const SignInForm = new (
  LoadableMixin.extend({
    methods: {
      setSignInLoading () {
        this.$setLoading(); // Unknown as default state.
        this.$setLoading('signIn');
      },
      unsetSignInLoading () {
        this.$unsetLoading(); // Unknown as default state.
        this.$unsetLoading('signIn');
      },
    }
  })
);

test('Loadable: $setLoading set state as loading', (context) => {
  context.false(SignInForm.$isLoading('signIn'));
  context.false(SignInForm.$isLoading()); // Unknown as default state.
  context.false(SignInForm.$isLoadingAny());

  SignInForm.setSignInLoading();

  context.true(SignInForm.$isLoading('signIn'));
  context.true(SignInForm.$isLoading()); // Unknown as default state.
  context.true(SignInForm.$isLoadingAny());

  SignInForm.unsetSignInLoading();
});

test('Loadable: $unsetLoading unset state as loading', (context) => {
  SignInForm.setSignInLoading();

  context.true(SignInForm.$isLoading('signIn'));
  context.true(SignInForm.$isLoading()); // Unknown as default state.
  context.true(SignInForm.$isLoadingAny());

  SignInForm.unsetSignInLoading();

  context.false(SignInForm.$isLoading('signIn'));
  context.false(SignInForm.$isLoading()); // Unknown as default state.
  context.false(SignInForm.$isLoadingAny());
});

test('Loadable: $isLoadingAny checks if any state is loading', (context) => {
  const SignInForm = new (
    LoadableMixin.extend({
      methods: {
        x () {
          this.$setLoading('x');
        },
        y () {
          this.$unsetLoading('x');
          this.$setLoading('y');
        },
        z () {
          this.$unsetLoading('y');
        }
      }
    })
  );

  context.false(SignInForm.$isLoading('x'));
  context.false(SignInForm.$isLoading('y'));
  context.false(SignInForm.$isLoadingAny());

  SignInForm.x();

  context.true(SignInForm.$isLoading('x'));
  context.false(SignInForm.$isLoading('y'));
  context.true(SignInForm.$isLoadingAny());

  SignInForm.y();

  context.false(SignInForm.$isLoading('x'));
  context.true(SignInForm.$isLoading('y'));
  context.true(SignInForm.$isLoadingAny());

  SignInForm.z();

  context.false(SignInForm.$isLoading('x'));
  context.false(SignInForm.$isLoading('y'));
  context.false(SignInForm.$isLoadingAny());
});
