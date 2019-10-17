/**
 * Call function and execute its hooks. Executes `onDone` when its done and
 * `onError` when it throws an error.
 * @param call
 * @param onDone
 * @param onError
 */
const callWithHooks = <T>(
  call: () => T | Promise<T>,
  onDone: () => void,
  onError: () => void = onDone,
): Promise<T> => {
  const handleError = (error: unknown) => {
    onError();
    return Promise.reject(error);
  };

  try {
    return Promise.resolve(call())
      .then((value: T) => {
        onDone();
        return Promise.resolve(value);
      })
      .catch(handleError);
  } catch (error) {
    return handleError(error);
  }
};

export default callWithHooks;
