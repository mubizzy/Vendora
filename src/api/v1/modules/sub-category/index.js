const router = require('express').Router();
const SubCategoryController = require('./controller');
const validateSubCategory = require('./validator');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', SubCategoryController.listSubCategories);

router.get('/:id', SubCategoryController.detailSubCategory);

router.post(
  '/',
  isAuth,
  isAdmin,
  validateSubCategory.createOrUpdate,
  SubCategoryController.createSubCategory,
);
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateSubCategory.createOrUpdate,
  SubCategoryController.updateSubCategory,
);

router.delete('/:id', isAuth, isAdmin, SubCategoryController.deleteSubCategory);

module.exports = { router, base: 'sub-categories' };
