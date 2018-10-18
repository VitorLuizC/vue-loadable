/**
 * Resolve value and
 * @template R
 * @param {() => (Promise<infer R> | infer R)} execute
 * @param {(value: R) => void} onExecute
 * @param {(error: Error) => void} onError
 * @returns {Promise<R>}
 */
const intercept = (execute, onExecute, onError) => {
  try {
    return Promise.resolve(execute())
      .then((value) => {
        onExecute(value);
        return Promise.resolve(value);
      })
      .catch((error) => {
        onError(error);
        return Promise.reject(error);
      });
  } catch (error) {
    onError(error);
    return Promise.reject(error);
  }
};

export default intercept;
