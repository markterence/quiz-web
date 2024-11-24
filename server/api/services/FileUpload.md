# Upload Specification

## Table of Contents

- [Configuration](#configuration)
- [File Upload Service](#file-upload-service)
  - [SailsJS Configuration](#sailsjs-configuration)
  - [Usage](#usage)
  - [Return Values](#return-values)
- [File REST API](#file-rest-api)
  - [FileMeta Structure](#filemeta-structure)
  - [Upload Controller](#upload-controller)
  - [File Controller](#file-controller)
    - [Streaming the file](#streaming-the-file)
    - [Direct Link access](#direct-link-access)
- [Links and Resources](#links)

# Configuration

The following terms and configuration should can be kept as environment variables, in this case the following are used declared in `sails.config.custom`

- `uploadDirectory` - Path on the local disk. This is where uploaded files are written. (e.g. "`/var/www/attachments/`" or "`/my-project/assets/attachments/`" or anything that is truthy).

  - `sails.config.custom.upload.uploadDirectory`
  - `process.env.UPLOAD_DIR`

- `uploadBaseUrl` - If you have a static file server and want to provide a direct link to the uploaded files for downloading/streaming them back to the client, then `uploadBaseUrl` is the URL of your static file server that points to the directory of the uploaded files (e.g. “`http://localhost:9000/`” or “`http://localhost:9000/attachments/`”)
  - `sails.config.custom.uploadBaseUrl`
  - `process.env.UPLOAD_BASE_URL`

**Example `config/custom.js` configuration for `upload`**

```js
module.exports.custom = {
  upload: {
    uploadBaseUrl: 'http://localhost:1338/uploads/',
    uploadDirectory: process.env.UPLOAD_DIR
  }
}
```

# File Upload Service

```js
FileUpload.upload(req, res, {fileHandle, pathToDisk, baseUrl = ''})
```

| Parameter       | Type            | Description             |
| --------------- | --------------- | ----------------------- |
| `req`           | Request Object  | Express Request Object  |
| `res`           | Response Object | Express Response Object |
| `uploadOptions` | Object          | Options Object          |

Available Upload Options

| Parameter    | Type   | Description                                                                                        |
| ------------ | ------ | -------------------------------------------------------------------------------------------------- |
| `fileHandle` | String | Http parameter name or the html field name that contains the File Object                           |
| `pathToDisk` | String | Location of the uploaded file on the disk. Defaults to `sai;s.config.appName`+`/.tmp/`             |
| `baseUrl`    | String | The url of the deployed application. (e.g. "http://localhost:1337/assets/files"). Defaults to `''` |

### SailsJS Configuration

- (Optional) Add `upload` object in `config/custom.js`.

```js
  upload: {
    // defaults to 30MB
    maxBytes: 30000000,
    uploadBaseUrl : process.env.UPLOAD_BASE_URL || "http://localhost:1338/uploads/",
    uploadDirectory: process.env.UPLOAD_DIR
  },
```

### Usage

```js
FileUpload.upload(req, res, {
  fileHandle: 'file'
})
  .then(function(result) {
    return res.json(result)
  })
  .catch(function(error) {
    if (error.code === 422) {
      return res.status(422).json(error.error)
    } else {
      sails.log.error(error)
      return res.status(500).json(error)
    }
  })
```

## Return Values

#### Success

| Key            | Type             | Description                                                              |
| -------------- | ---------------- | ------------------------------------------------------------------------ |
| `files`        | Array < Object > | Array containing information of the file.                                |
| `files.fd`     | String Path      | File Descriptor. This is the path of the uploded file on the disk.       |
| `files.size`   | Number           | Size of file in bytes.                                                   |
| `files.type`   | String           | File Type (e.g. "image/png", "image/jpeg"                                |
| `files.status` | String           |                                                                          |
| `field`        | String           | Filehandle                                                               |
| `fileUUID`     | String           | A guaranteed unique filename. Format: `UUID of the file.file extenstion` |
| `message`      | String           | Normal Message                                                           |

```json
{
  "files": [
    {
      "fd": "\\www\\assets\\uploads\\3704b9a7-47be-444f-bd3b-7a47cca3ddba.png",
      "size": 5597,
      "type": "image/png",
      "filename": "401070162318458880.png",
      "status": "finished",
      "field": "file",
      "fileUUID": "/3704b9a7-47be-444f-bd3b-7a47cca3ddba.png"
    },
    {
      "fd": "\\www\\assets\\uploads\\85ee8ac3-bb50-43db-b187-597b3861b7ad.png",
      "size": 18771,
      "type": "image/png",
      "filename": "460624517316739082.png",
      "status": "finished",
      "field": "file",
      "fileUUID": "/85ee8ac3-bb50-43db-b187-597b3861b7ad.png"
    }
  ],
  "message": "2 files(s) uploaded successfully"
}
```

#### Errors

**Reject 1**

```json
{
  "code": 422,
  "error": { "message": "No file was uploaded" }
}
```

**Reject 2**

```json
{
  "error": { "message": "Undefined 'fileHandle'" }
}
```

# File REST API

The generated File REST API is capable of uploading multiple files and saving them in the disk _not in the database_. Uploaded files are automatically given a unique name, UUID to be specific.

By default uploaded files in sails.js are saved in `assets/` directory. But for this module, uploaded files are saved in `assets/uploads` and can be accessed directly at `http://HOST:PORT/uploads/<uuid-filename>.<extenstion>`

## FileMeta Structure

Model: `FileMeta`

There is also a specific table for uploaded files. This table holds the information about the file.

#### `ip_filemeta` table definition

| Name        | Type   | Description                                              |
| ----------- | ------ | -------------------------------------------------------- |
| `filename`  | String | Original filename.                                       |
| `file_uuid` | String | The filename given in the server.                        |
| `size`      | Number | Size of file in bytes                                    |
| `type`      | String | File type                                                |
| `fd`        | String | File Descriptor. The path of the file on the local disk. |

## Upload Controller

Uploads a file and saves its basic file metadata on the database.

```
POST  /api/upload
```

#### Parameters

| Parametar | Type          | Details                                                                            |
| --------- | ------------- | ---------------------------------------------------------------------------------- |
| `file`    | File FormData | This is the `fileHandle`. Basically, files are submitted as `multipart/form-data`. |

#### Example

**cURL**

```bash
curl --request POST \
  --url http://localhost:1338/api/upload \
  --header 'cache-control: no-cache' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form 'file=@/path/to/file/397721563249770506.png' \
  --form 'file=@/path/to/file/398570232647647242.png'
```

**Example Response**

```json
{
  "files": [
    {
      "fd": "\\www\\assets\\uploads\\0fc89d31-7af2-4b3e-b12c-3386a8913e56.png",
      "size": 5694,
      "type": "image/png",
      "filename": "397721563249770506.png",
      "status": "finished",
      "field": "file",
      "file_uuid": "0fc89d31-7af2-4b3e-b12c-3386a8913e56.png"
    },
    {
      "fd": "\\www\\assets\\uploads\\93c05a03-e556-45dc-8896-92442adef357.png",
      "size": 19958,
      "type": "image/png",
      "filename": "398570232647647242.png",
      "status": "finished",
      "field": "file",
      "file_uuid": "93c05a03-e556-45dc-8896-92442adef357.png"
    }
  ],
  "message": "2 files(s) uploaded successfully"
}
```

## File Controler

The file controller is the dafault API for listing the uploaded file. This API Controller basically returns the record under `ip_filemeta` table or `FileMeta` model.

### Streaming the file

There are two ways to stream the file, first is through the FileMeta REST API, second is by accessing the direct link.

Imagine a users table with avatar field. The value of that field would be the referenced `filemeta_id` or the filename of the uploaded file (example: “`aae2-2ada-e4fa.png`”)

Using the **FileMeta API**, streaming the file would be similar to a default `findOne()` request or `GET /file/:id` but in this case the `:id` will be the filename of the file.

```
GET /file/aae2-2ada-e4fa.png
```

Using the REST API can give benefits of protecting the accessed file / resource, since it goes through a middleware first before streaming the file back.

```
GET /attachments/:id
```

This endpoint is used to stream a file. You can use this to securely stream the file back to the client. For example, adding a middleware for authenticated users to access a file.

#### Parameters

| Parametar | Type   | Details                         |
| --------- | ------ | ------------------------------- |
| `:id`     | String | This should be the `file_uuid`. |

#### Example

```bash
curl --request GET \
  --url http://localhost:1338/file/d50af04d-2fb3-4790-ade8-57bcace27aca.png
```

### Direct Link access

For this to work, you must have a static file server where the file is can be accessed directly. Saving the full direct link into the database is not recommended because the `baseUrl` might change. Using the same structure, a users table with avatar field containing the `filemeta_id` or the filename of the file as a value. Example we have a record like this in the database.

```json
{
  "user": "david",
  "avatar": "aae2-2ada-e4fa.png"
}
```

Before sending the response in the client. We should first perform a mapping in the structure to append the `uploadBaseUrl`. Simple as that. [An example can be found here](#map-example).

### List all files

```
GET: /api/files
```

As mentioned earlier, there is an endpoint the list the record of `FileMeta` model. The only thing that is stored in the `ip_filemeta` table is the full path to the file and its filename. By sending a `GET` request to `/api/files`, a direct link is genenerated. A `baseUrl` is being added as a prefix to the filename.

**Example Response**

```json
[
  {
    "status": "finished",
    "field": "file",
    "created_at": "2018-12-19T07:12:01.587Z",
    "updated_at": "2018-12-19T07:12:01.587Z",
    "deleted_at": null,
    "id": 1,
    "filename": "397721563249770506.png",
    "file_uuid": "0fc89d31-7af2-4b3e-b12c-3386a8913e56.png",
    "size": 5694,
    "type": "image/png",
    "fd": "\\www\\assets\\uploads\\0fc89d31-7af2-4b3e-b12c-3386a8913e56.png",
    "direct_link": "http://localhost:1338/uploads/0fc89d31-7af2-4b3e-b12c-3386a8913e56.png"
  },
  {
    "status": "finished",
    "field": "file",
    "created_at": "2018-12-19T07:12:01.587Z",
    "updated_at": "2018-12-19T07:12:01.587Z",
    "deleted_at": null,
    "id": 2,
    "filename": "398570232647647242.png",
    "file_uuid": "93c05a03-e556-45dc-8896-92442adef357.png",
    "size": 19958,
    "type": "image/png",
    "fd": "\\www\\assets\\uploads\\93c05a03-e556-45dc-8896-92442adef357.png",
    "direct_link": "http://localhost:1338/uploads/93c05a03-e556-45dc-8896-92442adef357.png"
  }
]
```

#### Map Example

For object

```js
let user = _.clone(this.user) // lodash.clone()
user.avatar = 'http:/host/' + this.user.avatar
return user

// {
// “user”: “david”,
// “avatar”: “http://host/aae2-2ada-e4fa.png”
// }
```

For Collection:

```js
// using lodash.map
return _.map(this.user, (e) => {
  e.avatar = 'http://host/' + e.avatar
  return e
})

// {
// “user”: “david”,
// “avatar”: “http://host/aae2-2ada-e4fa.png”
// }
```

## Links

- https://sailsjs.com/documentation/concepts/file-uploads
- https://sailsjs.com/config/custom
