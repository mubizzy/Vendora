const PostgresDbOperation = require('../../services/postgres-db-operation');

class ShippingMethodService extends PostgresDbOperation {
  static async listShippingMethod(query) {
    const data = await this.findAndCountAll(this.ShippingMethod, {
      ...query,
      searchItems: ['name'],
    });

    return { ...data, shippingMethods: data.collection, collection: undefined };
  }

  static async findOneShippingMethod(queryKeys, options) {
    return this.findOne(this.ShippingMethod, queryKeys, {
      ...options,
    });
  }

  static async detailShippingMethod(query) {
    return this.findOneShippingMethod(
      {
        ...query,
      },
      {
        include: [
          {
            model: this.User,
            as: 'creator',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
          {
            model: this.User,
            as: 'updater',
            attributes: ['id', 'firstName', 'lastName', 'name', 'email'],
          },
        ],
      },
    );
  }

  static async shippingMethodExist({ id, ...rest }) {
    const { data } = await this.findOneShippingMethod({
      ...rest,
      id: {
        [this.Sequelize.Op.ne]: id,
      },
    });

    return !!data;
  }

  static async addShippingMethod(body) {
    return this.create(this.ShippingMethod, body);
  }

  static async updateShippingMethod({ instance, payload }) {
    return this.save(instance, payload);
  }

  static async deleteShippingMethod({ id }) {
    const deletedShippingMethod = await this.destroy(this.ShippingMethod, {
      id,
    });
    return deletedShippingMethod;
  }
}

module.exports = ShippingMethodService;
