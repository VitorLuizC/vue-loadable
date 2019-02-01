/**
 * Call function and execute its hooks. Executes `onDone` when its done and
 * `onError` when it throws an error.
 * @param call
 * @param onDone
 * @param onError
 */
export default async function callWithHooks <T> (
  call: () => T | Promise<T>,
  onDone: (value: T) => void,
  onError: (error: Error) => void,
): Promise<T> {
  try {
    const value = await Promise.resolve(call());
    onDone(value);
    return Promise.resolve(value);
  } catch (error) {
    onError(error as Error);
    return Promise.reject(error);
  }
}
