/* eslint-disable security/detect-object-injection */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable no-nested-ternary */
const PostgresDbOperation = require('../../services/postgres-db-operation');

const variantAttributes = [
  'id',
  'weight',
  'length',
  'height',
  'width',
  'size',
  'color',
  'quantity',
  'sellingPrice',
];

const detailVarintAttributes = [
  'id',
  'sku',
  'barcode',
  'ean',
  'upc',
  'hsCode',
  'midCode',
  'weight',
  'length',
  'height',
  'width',
  'size',
  'color',
  'sellingPrice',
  'quantity',
];

const vendorAttributes = [
  'companyName',
  'companyEmail',
  'officeAddress',
  'companyPhoto',
  'officePhone',
  'tssaAuthorizationNumber',
  'tssaProLeUrl',
  'tssaAuthorizationStartDate',
  'tssaAuthorizationExpiryDate',
  'hraiAuthorizationNumber',
  'hraiProLeUrl',
  'hraiAuthorizationStartDate',
  'hraiAuthorizationExpiryDate',
  'vendorVerified',
];

class VendorProductService extends PostgresDbOperation {
  static async listVendorProduct(query) {
    const { q, ...rest } = query;
    const where = {};

    if (q) {
      where[this.Sequelize.Op.or] = [
        { email: { [this.Sequelize.Op.iLike]: `%${q}%` } },
        {
          [this.Sequelize.Op.and]: [
            {
              firstName: { [this.Sequelize.Op.iLike]: `%${q.split(' ')[0]}%` },
            },
            ...(q.split(' ')[1]
              ? [
                  {
                    lastName: {
                      [this.Sequelize.Op.iLike]: `%${q.split(' ')[1]}%`,
                    },
                  },
                ]
              : []),
          ],
        },
      ];
    }

    const data = await this.findAndCountAll(this.VendorProduct, {
      ...rest,
      searchItems: ['product.title'],
      include: [
        {
          model: this.Product,
          as: 'product',
          attributes: ['id', 'title', 'thumbnail', 'slug'],
        },
        {
          model: this.VendorVariant,
          as: 'vendorVariants',
          attributes: variantAttributes,
        },
        {
          model: this.User,
          as: 'creator',
          where,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'name',
            'email',
            ...vendorAttributes,
          ],
        },
        {
          model: this.User,
          as: 'updater',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
      ],
    });

    return { ...data, products: data.collection, collection: undefined };
  }

  static async findOneVendorProduct(queryKeys, options) {
    const product = await this.findOne(this.VendorProduct, queryKeys, {
      ...options,
    });
    return product;
  }

  static async findOneVariant(queryKeys, options) {
    const product = await this.findOne(this.VendorVariant, queryKeys, {
      ...options,
    });
    return product;
  }

  static async findAllVendorProducts(queryKeys, options) {
    const { count, rows } = await this.findAll(
      this.VendorProduct,
      queryKeys,
      options,
    );
    return { data: rows, count };
  }

  static async findAllDetailVendorProduct(queryKeys, options) {
    const data = await this.findAllVendorProducts(queryKeys, {
      ...options,
      include: [
        {
          model: this.Product,
          as: 'product',
          attributes: ['id', 'title', 'thumbnail', 'slug'],
        },
        {
          model: this.VendorVariant,
          as: 'vendorVariants',
          attributes: detailVarintAttributes,
        },
        {
          model: this.User,
          as: 'creator',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'name',
            'email',
            ...vendorAttributes,
          ],
        },
        {
          model: this.User,
          as: 'updater',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
      ],
    });
    return data;
  }

  static async detailVendorProduct(query) {
    const { userId, ...rest } = query;

    if (userId) {
      detailVarintAttributes.push('buyingPrice');
    }

    const product = await this.findOneVendorProduct(rest, {
      include: [
        {
          model: this.Product,
          as: 'product',
          attributes: ['id', 'title', 'thumbnail', 'slug'],
        },
        {
          model: this.VendorVariant,
          as: 'vendorVariants',
          attributes: detailVarintAttributes,
        },
        {
          model: this.User,
          as: 'creator',
          attributes: [
            'id',
            'firstName',
            'lastName',
            'name',
            'email',
            ...vendorAttributes,
          ],
        },
        {
          model: this.User,
          as: 'updater',
          attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
        },
      ],
    });
    return product;
  }

  static async createVendorProduct({ body }) {
    const { instance, data } = await this.create(this.VendorProduct, body);

    const variantPayload = body.variant.map((item) => ({
      ...item,
      vendorProductId: data.id,
    }));

    const variants = await this.bulkCreate(this.VendorVariant, variantPayload);

    return { instance, data: { ...data, variants } };
  }

  static async productExist({ id, ...rest }) {
    const { data } = await this.findOneProduct({
      ...rest,
      id: {
        [this.Sequelize.Op.ne]: id,
      },
    });

    return !!data;
  }

  static async bulkUpdateVariants(variants) {
    const updatedVariants = await Promise.all(
      variants.map(async (variant) => {
        const { instance } = await this.findOne(this.ProductVariant, {
          productId: variant.productId,
        });

        if (instance) {
          return (await this.save(instance, variant)).data;
        }
        return (await this.create(this.ProductVariant, variant)).data;
      }),
    );

    return updatedVariants;
  }

  static async updateVendorProduct({ instance, body }) {
    const colorsSet = new Set();
    const sizesSet = new Set();

    const variantPayload = body.variant.map((variant) => {
      if (variant.color) colorsSet.add(variant.color);
      if (variant.size) sizesSet.add(variant.size);

      return {
        ...variant,
        productId: instance.id,
      };
    });

    const productPayload = {
      ...body,
      colors: Array.from(colorsSet),
      sizes: Array.from(sizesSet),
    };

    const { data } = await this.save(instance, productPayload);

    const updatedVariants = await this.bulkUpdateVariants(variantPayload);

    return { instance, data: { ...data, variants: updatedVariants } };
  }

  static async updateStatus({ instance, ...rest }) {
    return this.save(instance, { ...rest });
  }

  static async updateVariantQuantity(type, variants = []) {
    variants.forEach(async (variant) => {
      const { data: productVariant, instance } = await this.findOneVariant({
        id: variant.vendorVariantId,
      });

      if (productVariant) {
        let { quantity } = { ...productVariant };

        if (type === 'increase') {
          quantity += variant.quantity;
        }
        if (type === 'decrease') {
          quantity -= variant.quantity;
        }

        await this.save(instance, { quantity });
      }
    });
  }

  static async deleteVendorProduct({ id }) {
    const deletedProduct = await this.destroy(this.VendorProduct, { id });
    return deletedProduct;
  }
}

module.exports = VendorProductService;
