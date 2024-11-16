const CategoryService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const db = require('../../models');

class CategoryController {
  static async listCategories(req, res, next) {
    try {
      const data = await CategoryService.listCategories(req.body);

      successResponse({
        res,
        msg: 'succ-category-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailCategory(req, res, next) {
    try {
      const { data: category } = await CategoryService.findOneCategory({
        ...req.params,
      });

      successResponse({
        res,
        msg: 'succ-detail-category',
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const { data: existingCategory } = await CategoryService.findOneCategory({
        name,
      });
      if (existingCategory) {
        errors.badRequestError(req.__('error-name-already-use'));
      }

      const { data: category } = await CategoryService.createCategory(req.body);

      successResponse({
        res,
        msg: 'succ-create-category',
        statusCode: 201,
        category,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { data: category, instance } =
        await CategoryService.findOneCategory({ id });

      if (!category) {
        return errors.badRequestError(req.__('error-category-not-found'));
      }

      if (req.body.name) {
        const { data: nameAlreadyExist } =
          await CategoryService.findOneCategory({
            name: req.body.name,
            id: { [db.Sequelize.Op.ne]: id },
          });
        if (nameAlreadyExist) {
          return errors.badRequestError(req.__('error-name-already-use'));
        }
      }

      const { data: updatedCategory } = await CategoryService.updateCategory({
        instance,
        payload: req.body,
      });

      successResponse({
        res,
        msg: 'succ-category-update',
        category: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { force } = req.query;

      const { data: category } = await CategoryService.findOneCategory({ id });
      if (!category) {
        errors.badRequestError(req.__('error-category-not-found'));
      }

      await CategoryService.deleteCategory({ id, force });

      successResponse({
        res,
        msg: 'succ-category-delete',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
