const AddressService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class AddressController {
  static async list(req, res, next) {
    try {
      const data = await AddressService.listAddress({
        ...req.body,
        userId: req.user.id,
      });

      successResponse({
        res,
        msg: 'succ-address-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;

      const { data: address } = await AddressService.findOneAddress({
        userId,
        ...req.body,
      });
      if (address) {
        errors.badRequestError(req.__('error-address-already-exist'));
      }

      const { data: newAddress } = await AddressService.addAddress({
        ...req.body,
        userId,
      });

      successResponse({
        res,
        msg: 'succ-add-address',
        statusCode: 201,
        address: newAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;

      const { data: address, instance } = await AddressService.findOneAddress({
        id,
      });
      if (!address) {
        errors.notFoundError(req.__('error-address-not-found'));
      }

      if (address.userId !== userId) {
        errors.forbiddenError(req.__('permission-denied'));
      }

      const existingAddress = await AddressService.addressExist({
        id,
        userId,
        ...req.body,
      });

      if (existingAddress) {
        errors.badRequestError(req.__('error-address-already-exist'));
      }

      const { data: updatedAddress } = await AddressService.updateAddress({
        instance,
        payload: req.body,
      });

      successResponse({
        res,
        msg: 'succ-update-address',
        statusCode: 200,
        address: updatedAddress,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      const { data: address } = await AddressService.findOneAddress({
        id,
      });

      if (address.userId !== req.user.id) {
        errors.forbiddenError(req.__('permission-denied'));
      }

      const data = await AddressService.deleteAddress({ id });
      if (data === 0) {
        errors.notFoundError('error-address-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-address',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AddressController;
