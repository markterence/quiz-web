const empty = require('is-empty');

module.exports = {
  /**
   * `is-empty` considers 0 as empty but it should be valid in this scenario
   * @param {Any} value
   */
  isEmpty: (value) => empty(value) && value !== 0,

  /**
   * Returns the value of the first parameter when `expr` is `null` or `undefined`.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
   * @param {Any} sqlColumn
   * @param {Boolean} expr
   *
   * @example
   * const query = { value: 1 }
   * nullCoalesce("dog", query.category) //=> undefined
   * nullCoalesce("dog", query.value)    //=> "dog"
   */
  nullCoalesce: (value, expr) => {
    if (expr) {
      return value;
    }
  },
};
