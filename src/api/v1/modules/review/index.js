const router = require('express').Router();
const reviewValidator = require('./validator');
const ReviewController = require('./controller');
const { isAuth, isAdmin } = require('../../middlewares');

router.post('/list', isAuth, isAdmin, ReviewController.list);

router.post('/public-list', ReviewController.publicList);

router.get('/:id', ReviewController.detail);

router.post('/', isAuth, reviewValidator.add, ReviewController.add);

router.put(
  '/status/:id',
  isAuth,
  reviewValidator.status,
  ReviewController.updateStatus,
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  reviewValidator.update,
  ReviewController.update,
);

router.delete('/:id', isAuth, isAdmin, ReviewController.remove);

module.exports = { router, base: 'reviews' };
