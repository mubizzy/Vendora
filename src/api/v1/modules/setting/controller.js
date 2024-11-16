const SettingService = require('./service');
const { successResponse } = require('../../helpers');

class SettingController {
  static async detail(req, res, next) {
    try {
      const { data: shippingMethod } = await SettingService.detailSetting({
        id: 1,
      });

      successResponse({
        res,
        msg: 'succ-setting-detail',
        shippingMethod,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;

      const { data: setting, instance } = await SettingService.findOneSetting({
        id: 1,
      });
      if (setting) {
        const { data: updatedSetting } = await SettingService.updateSetting({
          instance,
          payload: { ...req.body, updatedBy: userId },
        });

        return successResponse({
          res,
          msg: 'succ-update-setting',
          statusCode: 200,
          setting: updatedSetting,
        });
      }

      const { data: newSetting } = await SettingService.addSetting({
        ...req.body,
        updatedBy: userId,
      });

      successResponse({
        res,
        msg: 'succ-add-setting',
        statusCode: 201,
        setting: newSetting,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SettingController;
