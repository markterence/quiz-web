/**
 * Transforms a promise for "await" to return both error and result so you don't
 * have to wrap promises in try catch.
 * @example ```
 * let [ error, result ] = await to(promise)
 * ```
 *
 * This code was obtained from https://github.com/feathersjs-offline/owndata-ownnet/blob/83e83f917b067398fc7b64d5ff0e24b38e788ca6/packages/client/src/common/to.js
 * and has been modified.
 *
 */
export const to = function<T, U>(
  promise: Promise<T>,
): Promise<[U, null] | [null, T]> {
  return promise
    .then<[null, T]>((result: T) => [null, result])
    .catch<[U, null]>((err: U) => [err, null]);
};

export const asyncHandler = to;
