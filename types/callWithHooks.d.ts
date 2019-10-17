/**
 * Call function and execute its hooks. Executes `onDone` when its done and
 * `onError` when it throws an error.
 * @param call
 * @param onDone
 * @param onError
 */
declare const callWithHooks: <T>(call: () => T | Promise<T>, onDone: () => void, onError?: () => void) => Promise<T>;
export default callWithHooks;
