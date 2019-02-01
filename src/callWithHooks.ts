/**
 * Call function and execute its hooks. Executes `onDone` when its done and
 * `onError` when it throws an error.
 * @param call
 * @param onDone
 * @param onError
 */
export default async function callWithHooks <T> (
  call: () => T | Promise<T>,
  onDone: () => void,
  onError: () => void = onDone,
): Promise<T> {
  try {
    const value = await call();
    onDone();
    return Promise.resolve(value);
  } catch (error) {
    onError();
    return Promise.reject(error);
  }
}
