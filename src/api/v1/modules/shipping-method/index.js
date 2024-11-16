const router = require('express').Router();
const shippingMethodValidator = require('./validator');
const ShippingMethodController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', ShippingMethodController.list);

router.get('/:id', ShippingMethodController.detail);

router.post(
  '/',
  isAuth,
  isAdmin,
  shippingMethodValidator.upsert,
  ShippingMethodController.add,
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  shippingMethodValidator.upsert,
  ShippingMethodController.update,
);

router.delete('/:id', isAuth, isAdmin, ShippingMethodController.remove);

module.exports = { router, base: 'shipping-methods' };
