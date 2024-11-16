const router = require('express').Router();
const orderValidator = require('./validator');
const OrderController = require('./controller');
const { isAuth } = require('../../middlewares');

router.post('/list', isAuth, OrderController.list);

router.get('/:id', isAuth, OrderController.detail);

router.post('/', isAuth, orderValidator.upsert, OrderController.add);

router.put(
  '/status/:id',
  isAuth,
  orderValidator.status,
  OrderController.updateStatus,
);

// router.delete('/:id', isAuth, isAdmin, OrderController.remove);

module.exports = { router, base: 'orders' };
