import { mapActions } from 'vuex';
import loadable from './loadable';

const mapLoadableActions: typeof mapActions = function () {
  const params = arguments as unknown as Parameters<typeof mapActions>;
  const actions = mapActions.apply(null, params);

  return Object.keys(actions).reduce((methods, name) => {
    methods[name] = loadable(actions[name], name);
    return methods;
  }, Object.create(null) as ReturnType<typeof mapActions>);
};

export default mapLoadableActions;
