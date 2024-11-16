const router = require('express').Router();
const addressValidator = require('./validator');
const AddressController = require('./controller');
const { isAuth } = require('../../middlewares');

router.post('/list', isAuth, AddressController.list);

router.post('/', isAuth, addressValidator.upsert, AddressController.add);

router.put('/:id', isAuth, addressValidator.upsert, AddressController.update);

router.delete('/:id', isAuth, AddressController.remove);

module.exports = { router, base: 'addresses' };
