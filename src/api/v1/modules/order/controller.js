/* eslint-disable no-nested-ternary */
const OrderService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const CartService = require('../cart/service');

class OrderController {
  static async list(req, res, next) {
    try {
      const { role, id } = req.user;
      const roleQuery =
        role === 3 ? { customerId: id } : role === 2 ? { vendorId: id } : {};

      const data = await OrderService.listOrder({
        ...req.body,
        ...roleQuery,
        role,
      });

      successResponse({
        res,
        msg: 'succ-order-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { data: shippingMethod } = await OrderService.detailOrder({
        id: req.params.id,
      });

      successResponse({
        res,
        msg: 'succ-order-detail',
        shippingMethod,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id } = req.user;
      const { cart } = await CartService.listCartItems({ userId: id });
      const { error, data } = await CartService.findCartQuanity(
        req.body.variants,
      );

      if (!data) {
        errors.badRequestError(
          `${error.variant.vendorProduct.product.title} out of stock`,
        );
      }

      const orders = await OrderService.addOrder({
        ...req.body,
        customerId: id,
        cart,
      });

      successResponse({
        res,
        msg: 'succ-add-order',
        statusCode: 201,
        orders,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const { data: order, instance } = await OrderService.findOneOrder({
        id,
      });
      if (!order) {
        errors.notFoundError(req.__('error-order-not-found'));
      }

      if (order.status === 'cancel') {
        errors.badRequestError(req.__('error-order-already-cancel'));
      }

      if (order.status === 'delivered') {
        errors.badRequestError(req.__('error-order-already-delivered'));
      }

      if (status === 'cancel') {
        const { data: updatedOrder } = await OrderService.cancelOrder({
          instance,
          payload: { status, variants: order.variants },
        });

        return successResponse({
          res,
          msg: 'succ-update-order',
          statusCode: 200,
          order: updatedOrder,
        });
      }

      const { data: updatedOrder } = await OrderService.updateOrder({
        instance,
        payload: { status },
      });

      successResponse({
        res,
        msg: 'succ-update-order',
        statusCode: 200,
        order: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      const { data: order } = await OrderService.findOneOrder({ id });

      if (
        (order && order.status !== 'delivered') ||
        order.status === 'cancel'
      ) {
        errors.badRequestError(req.__('error-ordered-can-not-be-deleted'));
      }
      const data = await OrderService.deleteOrder({
        id,
      });
      if (data === 0) {
        errors.notFoundError('error-order-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-order',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
