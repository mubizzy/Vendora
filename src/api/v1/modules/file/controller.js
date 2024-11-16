const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class FileController {
  static async upload(req, res, next) {
    try {
      if (!req.file) {
        errors.badRequestError(req.__('error-file-required'));
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      successResponse({
        res,
        msg: 'succ-file-upload',
        statusCode: 201,
        fileUrl,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FileController;
