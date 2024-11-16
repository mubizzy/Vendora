const router = require('express').Router();
const productController = require('./controller');
const validator = require('./validator');
const { isAuth, isModerator, isAdmin } = require('../../middlewares');

router.post('/list', isAuth, productController.listProduct);

router.post('/public-list', productController.publicListProduct);

router.get('/stat', productController.productStat);

router.get(
  '/:identifier',
  isAuth,
  isModerator,
  productController.detailProduct,
);

router.get('/public/:identifier', productController.publicDetailProduct);

router.post(
  '/',
  isAuth,
  isAdmin,
  validator.productUpsert,
  productController.createProduct,
);

router.put(
  '/product-status',
  isAuth,
  isAdmin,
  validator.status,
  productController.updateStatus,
);

router.put(
  '/best-deal',
  isAuth,
  isAdmin,
  validator.bestDeal,
  productController.updateProductBestDeal,
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  validator.productUpsert,
  productController.updateProduct,
);

router.delete('/:id', isAuth, isAdmin, productController.deleteProduct);

module.exports = { router, base: 'products' };
