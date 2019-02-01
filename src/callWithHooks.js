/**
 * Call function and execute its hooks. Executes `onDone` when its done and
 * `onError` when it throws an error.
 * @param call
 * @param onDone
 * @param onError
 */
export default async function callWithHooks(call, onDone, onError) {
    try {
        const value = await Promise.resolve(call());
        onDone(value);
        return Promise.resolve(value);
    }
    catch (error) {
        onError(error);
        return Promise.reject(error);
    }
}
