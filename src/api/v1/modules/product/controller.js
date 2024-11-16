const ProductService = require('./service');
const errors = require('../../errors');
const { successResponse } = require('../../helpers');
const { createSlug } = require('../../utils');
const CategoryService = require('../category/service');
const SubCategoryService = require('../sub-category/service');
const VendorProductService = require('../vendor-product/service');

class ProductController {
  static async listProduct(req, res, next) {
    try {
      const data = await ProductService.listProducts({
        ...req.body,
        userId: req.user.id,
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
      const data = await ProductService.listProducts({
        ...req.body,
        status: 'published',
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

      // Check if identifier is a number (ID) or string (slug)
      const query = /^\d+$/.test(identifier)
        ? { id: parseInt(identifier, 10) }
        : { slug: identifier };

      const { data: product } = await ProductService.detailProduct({
        ...query,
        userId: req.user.id,
      });

      const relatedProducts = await ProductService.listProducts({
        category: product.categoryId,
      });

      successResponse({
        res,
        msg: 'succ-detail-product',
        product,
        relatedProducts: relatedProducts.products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async publicDetailProduct(req, res, next) {
    try {
      const { identifier } = req.params;

      // Check if identifier is a number (ID) or string (slug)
      const query = /^\d+$/.test(identifier)
        ? { id: parseInt(identifier, 10) }
        : { slug: identifier };

      const { data: product } = await ProductService.detailProduct(query);

      const relatedProducts = await ProductService.listProducts({
        category: product.categoryId,
      });

      const { data: vendorProduct } =
        await VendorProductService.findAllDetailVendorProduct({
          productId: product.id,
        });

      successResponse({
        res,
        msg: 'succ-detail-product',
        product,
        relatedProducts: relatedProducts.products,
        vendorProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async productStat(req, res, next) {
    try {
      const { data: bestDeal } = await ProductService.bestDealProduct({
        bestDeal: true,
      });

      const { data: limitedTimeSavingProducts } =
        await ProductService.limitedTimeSavingProducts();

      const { data: moreSavingProucts } =
        await ProductService.moreSavingProucts();

      const { data: popularProucts } = await ProductService.popularProucts();

      const { data: newArivalProducts } =
        await ProductService.newArrivalProucts();

      const { data: brands } = await ProductService.brandForYou();

      successResponse({
        res,
        msg: 'succ-product-stat',
        bestDeal,
        limitedTimeSavingProducts,
        moreSavingProucts,
        popularProucts,
        newArivalProducts,
        brands,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { title, categoryId, subCategoryId } = req.body;

      const { data: existingProduct } = await ProductService.findOneProduct({
        title,
      });
      if (existingProduct) {
        return errors.badRequestError(req.__('error-title-already-use'));
      }

      const { data: category } = await CategoryService.findOneCategory({
        id: categoryId,
      });
      if (!category) {
        return errors.notFoundError(req.__('error-category-not-found'));
      }

      const { data: subCategory } = await SubCategoryService.findOneSubCategory(
        {
          id: subCategoryId,
        },
      );
      if (!subCategory) {
        return errors.notFoundError(req.__('error-sub-category-not-found'));
      }

      req.body.slug = createSlug([title]);
      req.body.createdBy = req.user.id;

      const { data: product } = await ProductService.createProduct({
        body: req.body,
      });

      successResponse({
        res,
        msg: 'succ-create-product',
        statusCode: 201,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { title, categoryId, subCategoryId } = req.body;
      const { id } = req.params;

      const { data: product, instance } = await ProductService.findOneProduct({
        id,
      });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }

      const isTitleExist = await ProductService.titleExist({ title, id });
      if (isTitleExist) {
        errors.badRequestError(req.__('error-title-already-use'));
      }

      const { data: category } = await CategoryService.findOneCategory({
        id: categoryId,
      });
      if (!category) {
        return errors.notFoundError(req.__('error-category-not-found'));
      }

      const { data: subCategory } = await SubCategoryService.findOneSubCategory(
        {
          id: subCategoryId,
        },
      );
      if (!subCategory) {
        return errors.notFoundError(req.__('error-sub-category-not-found'));
      }

      req.body.slug = createSlug([title]);

      const { data: updatedProduct } = await ProductService.updateProduct({
        body: req.body,
        instance,
        updatedBy: req.user.id,
      });

      successResponse({
        res,
        msg: 'succ-update-product',
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProductBestDeal(req, res, next) {
    try {
      const { id } = req.body;

      const { data: product } = await ProductService.findOneProduct({
        id,
      });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }

      await ProductService.updateBestDeal({
        id,
        updatedBy: req.user.id,
      });

      successResponse({
        res,
        msg: 'succ-update-product-best-deal',
        product: { ...product, bestDeal: true },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id, status } = req.body;

      const { data: product, instance } = await ProductService.findOneProduct({
        id,
      });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }

      await ProductService.updateStatus({
        instance,
        status,
        updatedBy: req.user.id,
      });

      successResponse({
        res,
        msg: 'succ-update-product-status',
        product: { ...product, bestDeal: true },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { data: product } = await ProductService.findOneProduct({
        id: req.params.id,
      });
      if (!product) {
        return errors.notFoundError(req.__('error-product-not-found'));
      }
      await ProductService.deleteProduct({ id: req.params.id });
      successResponse({ res, msg: 'succ-delete-product' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
