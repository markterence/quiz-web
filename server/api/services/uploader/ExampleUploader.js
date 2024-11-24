/**
 * Example of an Uploader.
 */
const path = require('path');
const PATHS = require('../../constants/paths');
const { ServerError } = require('../../errors/customErrors');

module.exports = {
  upload: async function(req, res) {
    const secret = FileUpload.generateSecret(8);
    const pathId = Date.now() + '' + secret;
    const subdir = path.join('content', pathId);
    const dirname = path.join(PATHS.UPLOAD_DIR, subdir);

    const saveAsHandler = function(__newFileStream, next) {
      const filename = FileUpload.normalizeFilename(__newFileStream.filename);
      return next(undefined, filename);
    };

    const result = await FileUpload.upload(req, res, {
      fileHandle: 'file',
      strategy: 'local',
      pathToDisk: dirname,
      saveAs: saveAsHandler,
    }).catch(() => {
      throw new ServerError({
        description: 'Upload Error',
        code: 'UPLOAD_ERROR',
      });
    });

    if (result.files && result.files.length > 0) {
      return result.files.map((e) => {
        const url = `${sails.config.custom.upload.uploadBaseUrl}/${subdir}/${e.file_uuid}`;
        e['url'] = url;
        e['size'] = FileUpload.getFileSize(e.fd);
        return e;
      });
    }
  }
}
