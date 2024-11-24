const toType = (value) => typeof value;

const is = {
  match: (testFn, message = '') => (value, fieldValues) =>
    !testFn(value, fieldValues) && message,

  required: () => (value) =>
    isNilOrEmptyString(value) && 'This field is required',

  notEmptyString: () => (value) => !!value && value.trim() === '' && 'Required',

  minLength: (min) => (value) =>
    !!value && value.length < min && `Must be at least ${min} characters`,

  maxLength: (max) => (value) =>
    !!value && value.length > max && `Must be at most ${max} characters`,

  oneOf: (arr) => (value) =>
    !!value && !arr.includes(value) && `Must be one of: ${arr.join(', ')}`,

  notEmptyArray: () => (value) =>
    Array.isArray(value) &&
    value.length === 0 &&
    'Please add at least one item',

  email: () => (value) =>
    !!value && !/.+@.+\..+/.test(value) && 'Must be a valid email',

  url: () => (value) =>
    !!value &&
    // eslint-disable-next-line no-useless-escape
    !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      value
    ) &&
    'Must be a valid URL',

  isBoolean: () => (value) =>
    toType(value) !== 'boolean' && 'Must be a boolean',

  isNumber: () => (value) => toType(value) !== 'number' && 'Must be a number',

  isNumeric: () => (value) => !!isNaN(parseInt(value, 10)) && 'Must be numeric',

  isArray: () => (value) => !Array.isArray(value) && 'Must be an array',
};

const isNilOrEmptyString = (value) =>
  value === undefined || value === null || value === '';

const _ = require('lodash');

const generateErrors = (fieldValues, fieldValidators) => {
  const fieldErrors = {};

  // Remove the "{ default: ()=>{} }" object from the validators array
  // The validators array should only contain "Function" type
  const omitDefaultObject = (validators) =>
    _.filter(validators, (e) => typeof e === 'function');

  // remove default definition on fieldValidators
  Object.entries(fieldValidators).forEach(([fieldName, validators]) => {
    _.flatten(omitDefaultObject(validators)).forEach((validator) => {
      const errorMessage = validator(fieldValues[fieldName], fieldValues);

      if (errorMessage !== false && !fieldErrors[fieldName]) {
        fieldErrors[fieldName] = errorMessage;
      }
    });
  });
  return fieldErrors;
};

module.exports.generateErrors = generateErrors;
module.exports.is = is;
module.exports.toType = toType;
module.exports.isNilOrEmptyString = isNilOrEmptyString;
