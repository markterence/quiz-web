<!--

Here is a list of must-have items. Use them in the exact order that appears on this document.

- Every method must have the REST API request. For example:

  ```
  GET /boards/:id/trackers
  ```

- Every method must have a detailed description of the parameters.
- Every method must have a cURL example.
- Every method must have a response body (in JSON format)

-->

### Related Issues

<!-- Add related issues here if necessary -->

<!--

  - #26 - Create Issue States API

-->

### Summary

<!--

One or two sentence description of what endpoint does.

-->

```
METHOD /endpoint
```

Parameters:

| Attribute   | Type     | Required | Description           |
| :---------- | :------- | :------- | :-------------------- |
| `attribute` | datatype | yes/no   | Detailed description. |
| `attribute` | datatype | yes/no   | Detailed description. |

#### Notes:

**`200 OK`**

**`400 Bad Request`**

**`404 Not Found`**

**`403 Forbidden`**

Example request:

```
METHOD http://127.0.0.1:1337/api/:endpoint?:parameters
```

Example response:

```json
[{}]
```
