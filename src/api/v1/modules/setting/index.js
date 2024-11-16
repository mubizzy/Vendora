const router = require('express').Router();
const settingValidator = require('./validator');
const SettingController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.get('/', SettingController.detail);

router.post(
  '/',
  isAuth,
  isAdmin,
  settingValidator.upsert,
  SettingController.add,
);

module.exports = { router, base: 'settings' };
