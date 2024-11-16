const router = require('express').Router();
const taxValidator = require('./validator');
const TaxController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.get('/', TaxController.detail);

router.post('/', isAuth, isAdmin, taxValidator.upsert, TaxController.add);

module.exports = { router, base: 'taxes' };
