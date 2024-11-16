const TaxService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class TaxController {
  static async detail(req, res, next) {
    try {
      const { data: tax } = await TaxService.findOneTax({
        id: 1,
      });

      if (!tax) {
        errors.notFoundError(req.__('error-tax-not-found'));
      }

      successResponse({
        res,
        msg: 'succ-tax-detail',
        tax,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;

      const { data: tax, instance } = await TaxService.findOneTax({
        id: 1,
      });

      if (tax) {
        const { data: updatedTax } = await TaxService.updateTax({
          instance,
          payload: { ...req.body, updatedBy: userId },
        });
        return successResponse({
          res,
          msg: 'succ-update-tax',
          statusCode: 200,
          tax: updatedTax,
        });
      }

      const { data: newTax } = await TaxService.addTax({
        ...req.body,
        createdBy: userId,
      });

      successResponse({
        res,
        msg: 'succ-add-tax',
        statusCode: 201,
        tax: newTax,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaxController;
