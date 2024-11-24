const ExampleUploader = require("../services/uploader/ExampleUploader");

module.exports = {
  upload: function (req, res) {
    // Other body parameters should appear before any file fields.
    FileUpload.upload(req, res, {
      fileHandle: 'file',
      strategy: 'local',
      pathToDisk: req.body.dir,
    })
      .then(function (result) {
        const uploadResult = _.cloneDeep(result);
        FileMeta.createEach(result.files).then(function (d) {
          return res.json(uploadResult);
        });
      })
      .catch(function (error) {
        if (error.code === 422) {
          return res.status(422).json(error.error);
        } else {
          sails.log.error(error);
          return res.status(500).json(error);
        }
      });
  },

  /**
   * Custom uploader
   * Here is an example on how to use the custom ExampleUploader serivce
   * You can safely remove this `uploadExample` and the ExampleUploaded.
   * Also you can duplicate this pattern to handle FileUploads for your specific models.
   */
  uploadExample: async function(req, res) {
    const result = await ExampleUploader.upload(req, res);
    return res.json(result);
  }
};
