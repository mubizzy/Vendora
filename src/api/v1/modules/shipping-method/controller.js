const ShippingMethodService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class ShippingMethodController {
  static async list(req, res, next) {
    try {
      const data = await ShippingMethodService.listShippingMethod(req.body);

      successResponse({
        res,
        msg: 'succ-shipping-method-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { data: shippingMethod } =
        await ShippingMethodService.detailShippingMethod({
          id: req.params.id,
        });

      successResponse({
        res,
        msg: 'succ-shipping-method-detail',
        shippingMethod,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { name } = req.body;

      const { data: shippingMethod } =
        await ShippingMethodService.findOneShippingMethod({
          name,
        });
      if (shippingMethod) {
        errors.badRequestError(req.__('error-shipping-method-already-exist'));
      }

      const { data: newShippingMethod } =
        await ShippingMethodService.addShippingMethod({
          ...req.body,
          createdBy: userId,
        });

      successResponse({
        res,
        msg: 'succ-add-shipping-method',
        statusCode: 201,
        address: newShippingMethod,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { id: userId } = req.user;

      const { data: shippingMethod, instance } =
        await ShippingMethodService.findOneShippingMethod({
          id,
        });
      if (!shippingMethod) {
        errors.notFoundError(req.__('error-shipping-method-not-found'));
      }

      const existingShippingMethod =
        await ShippingMethodService.shippingMethodExist({
          id,
          name,
        });

      if (existingShippingMethod) {
        errors.badRequestError(req.__('error-shipping-method-already-exist'));
      }

      const { data: updatedShippingMethod } =
        await ShippingMethodService.updateShippingMethod({
          instance,
          payload: { ...req.body, updatedBy: userId },
        });

      successResponse({
        res,
        msg: 'succ-update-shipping-method',
        statusCode: 200,
        address: updatedShippingMethod,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const data = await ShippingMethodService.deleteShippingMethod({
        id: req.params.id,
      });
      if (data === 0) {
        errors.notFoundError('error-shipping-method-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-shipping-method',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ShippingMethodController;
