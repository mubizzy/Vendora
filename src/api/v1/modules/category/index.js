const router = require('express').Router();
const CategoryController = require('./controller');
const validateCategory = require('./validator');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', CategoryController.listCategories);

router.get('/:id', CategoryController.detailCategory);

router.post(
  '/',
  isAuth,
  isAdmin,
  validateCategory.create,
  CategoryController.createCategory,
);
router.put('/:id', isAuth, isAdmin, CategoryController.updateCategory);

router.delete('/:id', isAuth, isAdmin, CategoryController.deleteCategory);

module.exports = { router, base: 'categories' };
