const { generateErrors } = require('./utils/validation');
const { pick, pickBy, find } = require('lodash');
const { isEmpty } = require('./utils/common');

module.exports = {
  /**
   * Cleanses the object by removing empty fields
   * @param {Object} model The form validation schema
   * @param {Object} payload Object containing key-value pair
   * @returns {Object} Sanitized object
   */
  clean: function (model, payload) {
    if ('validations' in model) {
      const fields = Object.keys(model['validations']);
      const data = pick(payload, fields);

      // Resolve the specified default value.
      // When the field is empty,
      // assign the default value based on the `default` property defined on the schema
      for (const k of fields) {
        const defaultProp = find(
          model['validations'][k],
          (validators) => validators['default']
        );
        if (isEmpty(payload[k]) && defaultProp) {
          data[k] = defaultProp['default'];
        }
      }
      return pickBy(data, (e) => !isEmpty(e));
    }
  },

  validate: function (model, payload) {
    if ('validations' in model) {
      const errorFields = generateErrors(payload, model['validations']);

      if (Object.keys(errorFields).length > 0) {
        return { fields: errorFields };
      }
    }
  },

  /**
   * Used to format the return object from `Validation.validate()`
   *
   * @param {*} param0 Object containing a `fields` property
   * @returns {Object} Returns an object containing the fields that have error messages
   *
   * @example
   * toArrayMessages({ "fields": { "lastName": "This field is required" } })
   * // => { lastName: ["This field is required"] }
   */
  toArrayMessages({ fields }) {
    let errorFields = Object.assign({}, fields);
    for (const key in errorFields) {
      if (errorFields.hasOwnProperty(key)) {
        errorFields[key] = [errorFields[key]];
      }
    }
    return errorFields;
  },
};
