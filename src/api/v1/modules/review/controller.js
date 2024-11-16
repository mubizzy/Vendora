const ReviewService = require('./service');
const ProductService = require('../product/service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');

class ReviewController {
  static async list(req, res, next) {
    try {
      const { productId } = req.body;
      const data = await ReviewService.listReview(req.body);

      if (productId) {
        data.averageRating = ReviewService.findAverageRating(data.reviews);
      }

      const reviewCounts = ReviewService.reviewCount(data.reviews);

      successResponse({
        res,
        msg: 'succ-review-list',
        ...data,
        reviewCounts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async publicList(req, res, next) {
    try {
      const { productId } = req.body;
      const data = await ReviewService.listReview({
        ...req.body,
        status: 'active',
      });

      if (productId) {
        data.averageRating = ReviewService.findAverageRating(data.reviews);
      }

      const reviewCounts = ReviewService.reviewCount(data.reviews);

      successResponse({
        res,
        msg: 'succ-review-list',
        ...data,
        reviewCounts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const { data: review } = await ReviewService.detailReview({
        id: req.params.id,
      });

      successResponse({
        res,
        msg: 'succ-review-detail',
        review,
      });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.body;

      const { data: product } = await ProductService.findOneProduct({
        id: productId,
      });
      if (!product) {
        errors.notFoundError(req.__('error-product-not-found'));
      }

      const { data: newReview } = await ReviewService.addReview({
        ...req.body,
        customerId: userId,
      });

      successResponse({
        res,
        msg: 'succ-add-review',
        statusCode: 201,
        address: newReview,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const { productId } = req.body;

      const { data: product } = await ProductService.findOneProduct({
        id: productId,
      });
      if (!product) {
        errors.notFoundError(req.__('error-product-not-found'));
      }

      const { data: review, instance } = await ReviewService.findOneReview({
        id,
      });
      if (!review) {
        errors.notFoundError(req.__('error-review-not-found'));
      }

      const { data: updatedReview } = await ReviewService.updateReview({
        instance,
        payload: { ...req.body, updatedBy: userId },
      });

      successResponse({
        res,
        msg: 'succ-update-review',
        statusCode: 200,
        address: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const { status } = req.body;

      const { data: review, instance } = await ReviewService.findOneReview({
        id,
      });
      if (!review) {
        errors.notFoundError(req.__('error-review-not-found'));
      }

      const { data: updatedReview } = await ReviewService.updateReview({
        instance,
        payload: { status, updatedBy: userId },
      });

      successResponse({
        res,
        msg: 'succ-update-review-status',
        statusCode: 200,
        address: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const data = await ReviewService.deleteReview({
        id: req.params.id,
      });
      if (data === 0) {
        errors.notFoundError('error-review-not-found');
      }

      successResponse({
        res,
        msg: 'succ-delete-review',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReviewController;
