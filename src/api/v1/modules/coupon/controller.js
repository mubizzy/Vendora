const CouponService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const { generateStringCode } = require('../../utils');
// const ProductService = require('../product/service');

// function findMissingProductIds(products, applicableProducts) {
//   const missingProductIds = products.filter(
//     (id) => !applicableProducts.includes(id),
//   );

//   return missingProductIds.length > 0 ? missingProductIds : [];
// }

class CouponController {
  static async list(req, res, next) {
    try {
      const data = await CouponService.listCoupon(req.body);

      successResponse({
        res,
        msg: 'succ-coupon-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { data: coupon } = await CouponService.detailCoupon({
        id: req.params.id,
      });

      successResponse({
        res,
        msg: 'succ-coupon-detail',
        coupon,
      });
    } catch (error) {
      next(error);
    }
  }

  static async applyCoupon(req, res, next) {
    try {
      // const { couponCode, products } = req.body;
      const { couponCode } = req.body;

      const { data: coupon } = await CouponService.findOneCouponWithExiprity({
        couponCode,
      });

      if (!coupon) {
        errors.badRequestError(req.__('error-invalid-coupon'));
      }

      // const ids = findMissingProductIds(products, coupon.applicableProducts);

      // if (ids.length > 0) {
      //   const { data: product } = await ProductService.findOneProduct({
      //     id: products[0],
      //   });

      //   errors.badRequestError(
      //     `Coupon is not applicable for product: ${product.title}`,
      //   );
      // }

      successResponse({
        res,
        msg: 'succ-coupon-detail',
        coupon,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { title } = req.body;

      const { data: coupon } = await CouponService.findOneCoupon({
        title,
      });
      if (coupon) {
        errors.badRequestError(req.__('error-coupon-already-exist'));
      }

      req.body.couponCode = generateStringCode(8);

      const { data: newCoupon } = await CouponService.addCoupn({
        ...req.body,
        updatedBy: userId,
      });

      successResponse({
        res,
        msg: 'succ-add-coupon',
        statusCode: 201,
        address: newCoupon,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const { id: userId } = req.user;

      const { data: coupon, instance } = await CouponService.findOneCoupon({
        id,
      });
      if (!coupon) {
        errors.notFoundError(req.__('error-coupon-not-found'));
      }

      const existingCoupon = await CouponService.couponExist({
        id,
        title,
      });

      if (existingCoupon) {
        errors.badRequestError(req.__('error-coupon-already-exist'));
      }

      const { data: updatedCoupon } = await CouponService.updateCoupon({
        instance,
        payload: { ...req.body, updatedBy: userId },
      });

      successResponse({
        res,
        msg: 'succ-update-coupon',
        statusCode: 200,
        address: updatedCoupon,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const data = await CouponService.deleteCoupon({
        id: req.params.id,
      });
      if (data === 0) {
        errors.notFoundError('error-coupon-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-coupon',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CouponController;
