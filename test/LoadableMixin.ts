import { LoadableMixin } from '../src/vue-loadable';
import test from 'ava';

const createComponent = () => new (
  LoadableMixin.extend({})
);

// ..:: $isLoading method tests ::..

test('$isLoading: it returns false when no state is loading', (context) => {
  const Component = createComponent();

  context.false(Component.$isLoading('state'));
  context.false(Component.$isLoading()); // 'unknown' state as default.
});

// ..:: $isLoadingAny method tests ::..

test('$isLoadingAny: it returns false when no state is loading', (context) => {
  const Component = createComponent();

  context.false(Component.$isLoadingAny());
});

test('$isLoadingAny: it checks if any state is loading', (context) => {
  const Component = createComponent();

  context.false(Component.$isLoading('x')); // State 'x' and 'y' aren't loading
  context.false(Component.$isLoading('y')); // so any need to be false.
  context.false(Component.$isLoadingAny());

  Component.$setLoading('x');
  Component.$setLoading('y');

  context.true(Component.$isLoading('x')); // State 'x' and 'y' are loading
  context.true(Component.$isLoading('y')); // so any need to be true.
  context.true(Component.$isLoadingAny());

  Component.$unsetLoading('x');

  context.false(Component.$isLoading('x')); // State 'y' is loading but not 'x'
  context.true(Component.$isLoading('y'));  // so any need to be true.
  context.true(Component.$isLoadingAny());
});

// ..:: $setLoading method tests ::..

test('$setLoading: set state as loading', (context) => {
  const Component = createComponent();

  context.false(Component.$isLoading('A'));
  context.false(Component.$isLoading());

  Component.$setLoading('A');
  Component.$setLoading(); // 'unknown' state as default.

  context.true(Component.$isLoading('A'));
  context.true(Component.$isLoading());
});

test('$setLoading: setted states are accumulative, can be setted N times', (context) => {
  const Component = createComponent();

  context.false(Component.$isLoading('A'));

  Component.$setLoading('A');
  Component.$setLoading('A');

  context.true(Component.$isLoading('A'));

  Component.$unsetLoading('A');

  context.true(Component.$isLoading('A')); // Still loading because it
                                           // accumulates 2 loading states.
  Component.$unsetLoading('A');

  context.false(Component.$isLoading('A'));
});

// ..:: $unsetLoading method tests ::..

test('$unsetLoading: unset state as loading', (context) => {
  const Component = createComponent();

  Component.$setLoading('A');
  Component.$setLoading();

  context.true(Component.$isLoading('A'));
  context.true(Component.$isLoading());

  Component.$unsetLoading('A');
  Component.$unsetLoading(); // 'unknown' state as default.

  context.false(Component.$isLoading('A'));
  context.false(Component.$isLoading());
});

test('$unsetLoading: unset can\'t accumulate negative states', (context) => {
  const Component = createComponent();

  Component.$setLoading('A');

  context.true(Component.$isLoading('A'));

  Component.$unsetLoading('A');
  Component.$unsetLoading('A');

  context.false(Component.$isLoading('A'));

  Component.$setLoading('A');

  context.true(Component.$isLoading('A')); // It changes because it can't
});                                        // accumulate negative loading states
