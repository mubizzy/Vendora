const router = require('express').Router();
const cartController = require('./controller');
const cartValidator = require('./validator');
const { isAuth } = require('../../middlewares');

router.post('/list', isAuth, cartController.list);

router.post('/item', isAuth, cartValidator.cartUpsert, cartController.add);

router.delete('/:id', isAuth, cartController.remove);

module.exports = { router, base: 'carts' };
