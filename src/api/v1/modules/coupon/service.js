const PostgresDbOperation = require('../../services/postgres-db-operation');

class CouponService extends PostgresDbOperation {
  static async listCoupon(query) {
    const data = await this.findAndCountAll(this.Coupon, {
      ...query,
      searchItems: ['title'],
    });

    return { ...data, coupons: data.collection, collection: undefined };
  }

  static async findOneCoupon(queryKeys, options) {
    return this.findOne(this.Coupon, queryKeys, {
      ...options,
    });
  }

  static async findOneCouponWithExiprity(queryKeys, options) {
    return this.findOneCoupon(
      {
        ...queryKeys,
        expiredAt: {
          [this.Sequelize.Op.gt]: new Date(),
        },
      },
      {
        ...options,
      },
    );
  }

  static async detailCoupon(query) {
    return this.findOneCoupon(
      {
        ...query,
      },
      {
        include: [
          {
            model: this.User,
            as: 'updater',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
        ],
      },
    );
  }

  static async couponExist({ id, ...rest }) {
    const { data } = await this.findOneCoupon({
      ...rest,
      id: {
        [this.Sequelize.Op.ne]: id,
      },
    });

    return !!data;
  }

  static async addCoupn(body) {
    return this.create(this.Coupon, body);
  }

  static async updateCoupon({ instance, payload }) {
    return this.save(instance, payload);
  }

  static async deleteCoupon({ id }) {
    const deletedCoupon = await this.destroy(this.Coupon, {
      id,
    });
    return deletedCoupon;
  }
}

module.exports = CouponService;
