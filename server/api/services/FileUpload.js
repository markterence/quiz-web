/* eslint-disable prefer-arrow-callback */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const crypto = require('crypto');
const PATHS = require('../constants/paths');

function getFileDir(fd, uploadDir) {
  const _dirname = path.dirname(fd);
  return _dirname.substring(_dirname.indexOf(uploadDir) + uploadDir.length + 1);
}

function getSkipperAdapter(strategy, pathToDisk) {
  switch (strategy) {
    case 'minio':
      return {
        adapter: require('skipper-better-s3'),
        s3config: {
          s3ForcePathStyle: true,
          sslEnabled: false,
          signatureVersion: 'v4',
          endpoint: '192.168.99.100:9000',
        },
        key: 'minio',
        secret: 'minio123',
        bucket: 'chum',
        dirname: pathToDisk ? pathToDisk : null,
      };
    default:
      const resolvePath = function() {
        if (pathToDisk) {
          return path.resolve(pathToDisk);
        } else {
          return path.resolve(
            sails.config.appPath,
            path.join('assets', 'uploads')
          );
        }
      };

      return {
        dirname: resolvePath(),
      };
  }
}

module.exports = {
  getFileSize: (filePath) => {
    return fs.statSync(filePath).size;
  },

  normalizeFilename: function(filename) {
    return filename.replace(/\s/g, '_');
  },

  generateSecret: function(size = 16) {
    const buffer = crypto.randomBytes(size);
    return buffer.toString('hex');
  },

  /**
   * Base Upload function that saves the file with a UUID filename
   */
  upload: function(
    req,
    res,
    { fileHandle, pathToDisk, baseUrl = '', strategy = 'local', saveAs }
  ) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (!fileHandle) {
        sails.log.error('[FileUpload] Undefined `fileHandle`.');
        return reject({
          error: {
            message: `Undefined 'fileHandle'`,
          },
        });
      }
      // MinioClient.putObject(req, res, { bucket: 'chum' })
      let uploadOptions = getSkipperAdapter(strategy, pathToDisk);

      req.file(fileHandle).upload(
        {
          ...uploadOptions,
          ...{
            // 30MB
            maxBytes: sails.config.custom.upload.maxBytes || 30000000,
          },
          saveAs,
        },
        function(error, uploadedFiles) {
          if (error) {
            sails.log.error('[FileUpload] Unexpected error', error);
            return reject(error);
          }

          if (uploadedFiles.length === 0) {
            sails.log.debug('[FileUpload] No file was uploaded.');
            return reject({
              code: 422,
              error: { message: 'No file was uploaded.' },
            });
          }

          const files = _.map(uploadedFiles, function(e) {
            const fileDir = getFileDir(e.fd, PATHS.UPLOAD_DIR);

            const url = `${
              sails.config.custom.upload.uploadBaseUrl
            }/${fileDir}/${path.basename(e.fd)}`;

            e['relativeUrl'] = `${fileDir}/${path.basename(e.fd)}`;
            e['publicUrl'] = url;
            e['file_uuid'] = require('util').format('%s', path.basename(e.fd));
            e['size'] = self.getFileSize(e.fd);
            return e;
          });

          return resolve(
            _.cloneDeep({
              files: files,
              message: uploadedFiles.length + ' files(s) uploaded successfully',
            })
          );
        }
      );
    });
  },

  uploadWithMeta: async function(
    req,
    res,
    { fileHandle, pathToDisk, baseUrl = '', strategy = 'local', saveAs }
  ) {
    return this.upload(req, res, {
      fileHandle,
      saveAs,
      pathToDisk,
      baseUrl,
      strategy,
    }).then(async (result) => {
      if (result.files && result.files.length > 0) {
        const uploadResult = _.cloneDeep(result);

        const files = await FileMeta.createEach(uploadResult.files).fetch();

        return Promise.resolve({ files });
      }
    });
  },

  streamFile: function(fileId, pathToDisk) {
    var SkipperDisk = require('skipper-disk');
    var fileAdapter = SkipperDisk(/* optional opts */);

    const location = pathToDisk
      ? path.resolve(pathToDisk, fileId)
      : path.resolve(sails.config.appPath, 'assets/uploads', fileId);
    // Stream the file down
    return fileAdapter.read(location);
  },
};
