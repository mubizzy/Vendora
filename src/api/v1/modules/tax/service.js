const PostgresDbOperation = require('../../services/postgres-db-operation');

class TaxService extends PostgresDbOperation {
  static async findOneTax(queryKeys, options) {
    return this.findOne(this.Tax, queryKeys, {
      ...options,
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
    });
  }

  static async addTax(body) {
    return this.create(this.Tax, body);
  }

  static async updateTax({ instance, payload }) {
    return this.save(instance, payload);
  }
}

module.exports = TaxService;
