/* eslint-disable no-async-promise-executor */
/* eslint-disable security/detect-object-injection */
const PostgresDbOperation = require('../../services/postgres-db-operation');
const ProductService = require('../vendor-product/service');
const CardService = require('../cart/service');

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

class OrderService extends PostgresDbOperation {
  static async listOrder(query) {
    const { name, role, q, ...rest } = query;
    const where = {
      deletedAt: null, // Ensure only non-deleted records are fetched
    };

    if (name) {
      where[this.Sequelize.Op.or] = [
        { email: { [this.Sequelize.Op.iLike]: `%${name}%` } },
        {
          [this.Sequelize.Op.and]: [
            {
              firstName: {
                [this.Sequelize.Op.iLike]: `%${name.split(' ')[0]}%`,
              },
            },
            ...(name.split(' ')[1]
              ? [
                  {
                    lastName: {
                      [this.Sequelize.Op.iLike]: `%${name.split(' ')[1]}%`,
                    },
                  },
                ]
              : []),
          ],
        },
      ];
    }

    const customerInclude = {
      model: this.User,
      as: 'customer',
      attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
    };

    const vendorInclude = {
      model: this.User,
      as: 'vendor',
      attributes: [
        'id',
        'firstName',
        'lastName',
        'name',
        'email',
        ...vendorAttributes,
      ],
    };

    const adminInclude = {
      model: this.User,
      as: 'admin',
      attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
    };

    if (role === 2) {
      customerInclude.where = where;
    }

    const data = await this.findAndCountAll(this.Order, {
      ...rest,
      variants: {
        [this.Sequelize.Op.contains]: [
          {
            vendorProduct: {
              product: {
                title: q,
              },
            },
          },
        ],
      },
      include: [customerInclude, adminInclude, vendorInclude],
    });

    return { ...data, orders: data.collection, collection: undefined };
  }

  static async findOneOrder(queryKeys, options) {
    return this.findOne(this.Order, queryKeys, {
      ...options,
    });
  }

  static async detailOrder(query) {
    return this.findOneOrder(
      {
        ...query,
      },
      {
        include: [
          {
            model: this.User,
            as: 'customer',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
          {
            model: this.User,
            as: 'admin',
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
            as: 'vendor',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
        ],
      },
    );
  }

  static separateVariantsByCreatedBy({ variants }) {
    const separatedVariants = {};

    variants.forEach((variant) => {
      const { createdBy } = variant.vendorProduct;

      if (!separatedVariants[createdBy]) {
        separatedVariants[createdBy] = [];
      }

      separatedVariants[createdBy].push(variant);
    });

    return Object.values(separatedVariants);
  }

  static async addSeparateOrder(separatedVendorVariants, body) {
    const orders = [];

    return new Promise(async (resolve) => {
      for await (const vendorVariant of separatedVendorVariants) {
        const { data: order } = await this.create(this.Order, {
          ...body,
          variants: vendorVariant,
          customerId: body.customerId,
          vendorId: vendorVariant[0].vendorProduct.createdBy,
        });

        orders.push(order);
      }

      resolve(orders);
    });
  }

  static async addOrder(body) {
    const seperatedVendorVariants = this.separateVariantsByCreatedBy({
      variants: body.variants,
    });

    const transaction = await this.sequelize.transaction();
    try {
      await ProductService.updateVariantQuantity('decrease', body.variants);

      await CardService.deleteAllCardItem(body.cart);
      const orders = await this.addSeparateOrder(seperatedVendorVariants, body);

      await transaction.commit();
      return orders;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async updateOrder({ instance, payload }) {
    return this.save(instance, payload);
  }

  static async cancelOrder({ instance, payload }) {
    const transaction = await this.sequelize.transaction();

    try {
      await ProductService.updateVariantQuantity('increase', payload.variants);
      const data = this.save(instance, { status: payload.status });

      await transaction.commit();

      return data;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deleteOrder({ id }) {
    const deletedOrder = await this.destroy(this.Order, {
      id,
    });
    return deletedOrder;
  }
}

module.exports = OrderService;
