# Form Validation

This form validation refers to the first layer of request parameter validation.

The validation is simple

1. Decouple the form validation from the model file by creating a file in the `api/forms/` folder
2. The filename can be any as long as it is proper/related to the form/request being validated
3. Write the validation schema. When writing the validation schema, make sure that the rules are inside the `validations` property

```js
// api/forms/Posts.js

const { is } = require('../services/utils/validation')

module.exports = {
  validations: {
    subject: [ is.required() ]
  }
}
```

4.We want to try to abstract the validation rules. We can group validation for `create`, `update`, or whatever scenario.

```js
// api/forms/Posts.js

const { is } = require('../services/utils/validation')

module.exports = {
  createPost: {
    validations: {
      topic: [ is.required() ]
      subject: [ is.required(), is.maxLength(2000) ]
    },
  }
  editPost: {
    validations: {
      subject: [ is.required(), is.maxLength(2000) ]
      visibility: [is.oneOf['followers', 'public', 'onlyme']]
    }
  }
}
```

5. Create and `index.js` to serve as the entrypoint of the validations

```js
module.exports = {
  Posts: require('./Posts')
}
```

6. **Usage:** To use the rules.

```js
const form = require('../forms')

module.exports = function(req, res) {
  let valuesToCreate = req.body
  const errors = ValidationService.validate(forms.Posts.createPost, valuesToCreate)
  if(errors) {
    return res.status(400).json(errors)
  }
  // Do layer 2 validation

  Posts.create(valuesToCreate)
}
```

The format of the `error` object literal would be:

- `fields` - Object containing key value of field name and validation messaage.

Example:

```js
{
  fields: {
    subject: "This field is required"
  }
}
```
