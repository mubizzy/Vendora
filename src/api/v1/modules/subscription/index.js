const router = require('express').Router();
const subscriptionValidator = require('./validator');
const SubscriptionController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', isAuth, isAdmin, SubscriptionController.list);

router.post('/', subscriptionValidator.add, SubscriptionController.add);

router.delete('/:id', isAuth, isAdmin, SubscriptionController.remove);

module.exports = { router, base: 'subscriptions' };
