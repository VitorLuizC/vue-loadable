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

test('Loadable: $set/unsetLoading are accumulative', (context) => {
  const Component = new (
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

  context.false(Component.$isLoading('state'));

  Component.$setLoading('state');
  Component.$setLoading('state');

  context.true(Component.$isLoading('state'));

  Component.$unsetLoading('state');

  context.true(Component.$isLoading('state'));

  Component.$unsetLoading('state');

  context.false(Component.$isLoadingAny());
});

test('Loadable: $isLoadingAny checks if any state is loading', (context) => {
  const Component = new (
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

  context.false(Component.$isLoading('x'));
  context.false(Component.$isLoading('y'));
  context.false(Component.$isLoadingAny());

  Component.x();

  context.true(Component.$isLoading('x'));
  context.false(Component.$isLoading('y'));
  context.true(Component.$isLoadingAny());

  Component.y();

  context.false(Component.$isLoading('x'));
  context.true(Component.$isLoading('y'));
  context.true(Component.$isLoadingAny());

  Component.z();

  context.false(Component.$isLoading('x'));
  context.false(Component.$isLoading('y'));
  context.false(Component.$isLoadingAny());
});

// ..:: `loadable` decorator tests ::..

test('Decorator: preserve function arguments and return', async (context) => {
  const getParams = loadable(async function (...args: any[]) {
    return Array.from(arguments);
  }, 'arguments');

  const Component = new (
    LoadableMixin.extend({
      methods: {
        getParams
      }
    })
  );

  const params = ['Vitor', 22, 'Samanta', 1.66, false, [1,2,3]];

  context.deepEqual(params, await Component.getParams(...params));
});

test('Decorator: set loading on init and unset on resolve or reject', async (context) => {
  const Component = new (
    LoadableMixin.extend({
      methods: {
        x: loadable(async function (...args: any[]) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return 1;
        }, 'x'),
        y: loadable(async function (...args: any[]) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          throw new Error('Y');
        }, 'y')
      }
    })
  );

  context.false(Component.$isLoading('x'));

  const promiseX = Component.x();

  context.true(Component.$isLoading('x'));

  context.is(await promiseX, 1);
  context.false(Component.$isLoading('x'));

  context.false(Component.$isLoading('y'));

  const promiseY = Component.y();

  context.true(Component.$isLoading('y'));

  await context.throwsAsync(() => promiseY, Error, 'Y');
  context.false(Component.$isLoading('y'));
});
