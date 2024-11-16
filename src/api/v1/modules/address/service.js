const PostgresDbOperation = require('../../services/postgres-db-operation');

class AddressService extends PostgresDbOperation {
  static async listAddress(query) {
    const data = await this.findAndCountAll(this.Address, {
      ...query,
      searchItems: ['address'],
    });

    return { ...data, addresses: data.collection, collection: undefined };
  }

  static async findOneAddress(queryKeys, options) {
    return this.findOne(this.Address, queryKeys, {
      ...options,
    });
  }

  static async addressExist({ id, ...rest }) {
    const { data } = await this.findOneAddress({
      ...rest,
      id: {
        [this.Sequelize.Op.ne]: id,
      },
    });

    return !!data;
  }

  static async addAddress(body) {
    return this.create(this.Address, body);
  }

  static async updateAddress({ instance, payload }) {
    return this.save(instance, payload);
  }

  static async deleteAddress({ id }) {
    const deletedAddress = await this.destroy(this.Address, { id });
    return deletedAddress;
  }
}

module.exports = AddressService;
