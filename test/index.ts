import test from 'ava';
import Loadable from '../src/vue-loadable';

test('API: it default exports an object with install function', (context) => {
  context.truthy(Loadable);
  context.is(typeof Loadable, 'object');
  context.is(typeof Loadable.install, 'function');
});
