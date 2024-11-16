const SubCategoryService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const categoryService = require('../category/service');

class SubCategoryController {
  static async listSubCategories(req, res, next) {
    try {
      const data = await SubCategoryService.listSubCategories({
        ...req.body,
      });

      successResponse({
        res,
        msg: 'succ-sub-category-list',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailSubCategory(req, res, next) {
    try {
      const { data: subCategory } = await SubCategoryService.detailSubCategory({
        ...req.params,
      });

      if (!subCategory) {
        errors.notFoundError(req.__('error-sub-category-not-found'));
      }

      successResponse({
        res,
        msg: 'succ-detail-sub-category',
        subCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createSubCategory(req, res, next) {
    try {
      const { categoryId } = req.body;

      const { data: category } = await categoryService.findOneCategory({
        id: parseInt(categoryId, 10),
      });
      if (!category) {
        errors.notFoundError(req.__('error-category-not-found'));
      }

      const { data: subCategory } = await SubCategoryService.createSubCategory({
        body: req.body,
        category,
      });

      successResponse({
        res,
        msg: 'succ-create-sub-category',
        statusCode: 201,
        subCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { categoryId } = req.body;

      const { data: subCategory, instance } =
        await SubCategoryService.detailSubCategory({ id });

      if (!subCategory) {
        return errors.badRequestError(req.__('error-sub-category-not-found'));
      }

      const { data: category } = await categoryService.findOneCategory({
        id: categoryId,
      });

      if (!category) {
        errors.notFoundError(req.__('error-category-not-found'));
      }

      const { data: updatedSubCategory } =
        await SubCategoryService.updateSubCategory({
          instance,
          body: req.body,
          category,
        });

      successResponse({
        res,
        msg: 'succ-sub-category-update',
        subCategory: updatedSubCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { force } = req.query;

      const { data: subCategory } = await SubCategoryService.findOneSubCategory(
        { id },
      );
      if (!subCategory) {
        errors.badRequestError(req.__('error-sub-category-not-found'));
      }

      await SubCategoryService.deleteSubCategory({ id, force });

      successResponse({
        res,
        msg: 'succ-sub-category-delete',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SubCategoryController;
