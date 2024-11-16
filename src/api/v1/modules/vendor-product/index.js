const router = require('express').Router();
const VendorProductController = require('./controller');
const validator = require('./validator');
const { isAuth, isModerator, isAdmin } = require('../../middlewares');

router.post('/list', isAuth, isModerator, VendorProductController.listProduct);

router.post('/public-list', VendorProductController.publicListProduct);

router.get(
  '/:identifier',
  isAuth,
  isModerator,
  VendorProductController.detailProduct,
);

router.get('/public/:identifier', VendorProductController.publicDetailProduct);

router.post(
  '/',
  isAuth,
  isModerator,
  validator.vendorProductUpsert,
  VendorProductController.createVendorProduct,
);

router.put(
  '/product-status/:id',
  isAuth,
  isAdmin,
  VendorProductController.verifyVendorProduct,
);

router.put(
  '/:id',
  isAuth,
  isModerator,
  validator.vendorProductUpsert,
  VendorProductController.updateVendorProduct,
);

router.delete(
  '/:id',
  isAuth,
  isModerator,
  VendorProductController.deleteProduct,
);

module.exports = { router, base: 'vendor-products' };
