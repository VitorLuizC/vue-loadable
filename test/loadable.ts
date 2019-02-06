import test from 'ava';
import { loadable, LoadableMixin } from '../src/vue-loadable';

test('loadable: preserve function arguments and returned value, but in a promise', async (context) => {
  const Component = new (
    LoadableMixin.extend({
      methods: {
        getParams: loadable((...args: any[]) => { // The function arguments are
          return Array.from(arguments);           // preserved, but it uses a
        }, 'arguments')                           // Promise wrapping return.
      }
    })
  );

  const params = ['Vitor', 22, 'Samanta', 1.66, false, [1,2,3]];

  context.deepEqual(params, await Component.getParams(...params));
});

const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

test('loadable: set loading on init and unset on resolve or reject', async (context) => {
  const Component = new (
    LoadableMixin.extend({
      methods: {
        x: loadable(function (): Promise<number> { // This returns a Promise
          return sleep(1000)                       // just to show it works same
            .then(() => 1);                        // way as async/await fns.
        }, 'x'),
        y: loadable(async function () {
          await sleep(1000);
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
