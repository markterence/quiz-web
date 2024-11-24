const path = require('path')
module.exports = {
  file: function (req, res) {
    // We can also apply a middleware and some validation before streaming the file.

    // Get the uploadDirectory from the configuration
    const pathToDisk = sails.config.custom.upload.uploadDirectory

    // Optionally set the filename to the same file as the user uploaded.
    // res.set('Content-disposition', "attachment; filename='" + file.name + "'")

    // Stream the file
    FileUpload.streamFile(req.params.id, pathToDisk)
      .on('error', function (err) {
        sails.log.error('[FileController:file]', err)
        return res.notFound()
      })
      .pipe(res)
  },

  find: function (req, res) {
    FileMeta.find().then((result) => {
      const linked = _.map(result, function (e) {
        e['direct_link'] =
          sails.config.custom.upload.uploadBaseUrl + e.file_uuid
        return e
      })
      return res.json(linked)
    })
  }
}
