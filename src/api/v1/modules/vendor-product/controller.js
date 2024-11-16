const VendorProductService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const ProductService = require('../product/service');

class VendorProductController {
  static async listProduct(req, res, next) {
    try {
      const userQuery = {};
      const { role, id } = req.user;

      if (role === 2) {
        userQuery.createdBy = id;
      }
      const data = await VendorProductService.listVendorProduct({
        ...req.body,
        ...userQuery,
      });

      successResponse({
        res,
        msg: 'succ-list-products',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async publicListProduct(req, res, next) {
    try {
      const data = await VendorProductService.listVendorProduct({
        ...req.body,
        verified: true,
      });

      successResponse({
        res,
        msg: 'succ-list-products',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailProduct(req, res, next) {
    try {
      const { identifier } = req.params;
      const { id: userId } = req.user;

      const { data: product } = await VendorProductService.detailVendorProduct({
        id: identifier,
        userId,
      });

      successResponse({
        res,
        msg: 'succ-detail-vendor-product',
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async publicDetailProduct(req, res, next) {
    try {
      const { identifier } = req.params;

      const { data: product } = await VendorProductService.detailVendorProduct({
        id: identifier,
        verified: true,
      });

      successResponse({
        res,
        msg: 'succ-detail-vendor-product',
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createVendorProduct(req, res, next) {
    try {
      const { productId } = req.body;

      const { id } = req.user;

      const { data: existingVendorProduct } =
        await VendorProductService.findOneVendorProduct({
          productId,
          createdBy: id,
        });
      if (existingVendorProduct) {
        return errors.badRequestError(req.__('error-product-already-use'));
      }

      const { data: existingProduct } = await ProductService.findOneProduct({
        id: productId,
        status: 'published',
      });
      if (!existingProduct) {
        errors.notFoundError(req.__('error-product-not-found'));
      }

      req.body.createdBy = req.user.id;

      const { data: product } = await VendorProductService.createVendorProduct({
        body: req.body,
      });

      successResponse({
        res,
        msg: 'succ-create-vendor-product',
        statusCode: 201,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateVendorProduct(req, res, next) {
    try {
      const { productId } = req.body;
      const { id } = req.params;
      const { id: userId } = req.user;

      const { data: product, instance } =
        await VendorProductService.findOneVendorProduct({
          id,
        });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }

      const existingVendorProduct = await VendorProductService.productExist({
        productId,
        createdBy: product.createdBy,
        id,
      });
      if (existingVendorProduct) {
        errors.badRequestError(req.__('error-product-already-use'));
      }

      const { data: existingProduct } = await ProductService.findOneProduct({
        id: productId,
      });
      if (!existingProduct) {
        errors.notFoundError(req.__('error-product-not-found'));
      }

      req.body.updatedBy = userId;
      const { data: updatedProduct } =
        await VendorProductService.updateVendorProduct({
          body: req.body,
          instance,
          updatedBy: req.user.id,
        });

      successResponse({
        res,
        msg: 'succ-update-vendor-product',
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyVendorProduct(req, res, next) {
    try {
      const { id } = req.params;

      const { data: product, instance } =
        await VendorProductService.findOneVendorProduct({
          id,
        });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }

      await VendorProductService.updateStatus({
        instance,
        verified: true,
        updatedBy: req.user.id,
      });

      successResponse({
        res,
        msg: 'succ-update-product-status',
        product: { ...product },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { data: product } = await VendorProductService.findOneProduct({
        id: req.params.id,
      });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }
      await VendorProductService.deleteVendorProduct({ id: req.params.id });
      successResponse({ res, msg: 'succ-delete-product' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VendorProductController;
