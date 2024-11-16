const CartService = require('./service');
const ProductService = require('../vendor-product/service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class CartController {
  static async list(req, res, next) {
    try {
      const data = await CartService.listCartItems({
        ...req.body,
        userId: req.user.id,
      });
      successResponse({ res, msg: 'succ-list-cart', ...data });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { variantId, quantity } = req.body;
      const { id: userId } = req.user;

      const { data: variant } = await ProductService.findOneVariant({
        id: variantId,
      });
      if (!variant) {
        errors.notFoundError(req.__('error-variant-not-found'));
      }

      if (variant.quantity < 1) {
        errors.badRequestError(req.__('error-product-out-of-stock'));
      }

      const { data: cartItem, instance } = await CartService.findOneCartItem({
        userId,
        vendorProductId: variant.vendorProductId,
        vendorVariantId: variantId,
      });
      if (cartItem) {
        const { data: cart } = await CartService.updateCartItem({
          instance,
          quantity,
          vendorProductId: variant.vendorProductId,
        });
        return successResponse({
          statusCode: 200,
          res,
          msg: 'succ-udpate-cart-item',
          cart,
        });
      }

      const { data: cart } = await CartService.addCartItem({
        body: {
          ...req.body,
          userId,
          vendorProductId: variant.vendorProductId,
          vendorVariantId: variantId,
        },
      });

      successResponse({
        statusCode: 201,
        res,
        msg: 'succ-add-cart-item',
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;

      const { data: cartItem } = await CartService.findOneCartItem({ id });
      if (!cartItem) {
        return errors.notFoundError(req.__('error-cart-item-not-found'));
      }

      await CartService.deleteCartItem({ id });

      successResponse({ res, msg: 'succ-delete-cart-item' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
