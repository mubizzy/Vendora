const router = require('express').Router();
const couponValidator = require('./validator');
const CouponController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', isAuth, isAdmin, CouponController.list);

router.get('/:id', isAuth, isAdmin, CouponController.detail);

router.post('/apply-coupon', isAuth, CouponController.applyCoupon);

router.post('/', isAuth, isAdmin, couponValidator.upsert, CouponController.add);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  couponValidator.upsert,
  CouponController.update,
);

router.delete('/:id', isAuth, isAdmin, CouponController.remove);

module.exports = { router, base: 'coupons' };
